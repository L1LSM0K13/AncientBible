const fs = require('node:fs/promises')
const pathUtil = require('node:path')
const {pool} = require('./config/dbConfig')

function helpCmd() {
    console.log(`
node migrate <command>

Commands:
 - help: Displays this message
 - create <name>: Creates a new migration with the specified name
 - apply [number]: Applies all migrations, or a specific number of migrations
 - revert <number>: Applies a specific number of migrations

Example:

node migration create my-migration
`.trim())
}

/**
 *
 * @param fileName
 * @param {string} fileName
 */
async function createMigration(fileName) {

    const formattedDate = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const template = `module.exports = {
  name: '${fileName}',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    const results = await pool.query(\`\`)

    console.table(results.rows)
  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    const results = await pool.query(\`\`)

    console.table(results.rows)
  }
}`

    try {
        await fs.writeFile(`./migrations/${fileName + '_' + formattedDate}.js`, template)
    } catch (err) {
        console.error(err, 'could not write migrations')
    }
}

async function fetchMigrations() {
    /**
     * @typedef Migration
     * @property {string} name
     * @property {(dbConn: any) => Promise<void>} apply
     * @property {(dbConn: any) => Promise<void>} revert
     */

    /**
     * All migrations
     * @type {Migration[]}
     */
    const migrations = []

    const migrationsDir = pathUtil.join(__dirname, 'migrations')
    const fetchedMigrations = await fs.readdir(migrationsDir)
    fetchedMigrations.sort()

    for (const migrationFilename of fetchedMigrations) {
        const migrationPath = pathUtil.resolve(migrationsDir, migrationFilename)

        if (!migrationPath.endsWith('.js')) {
            continue
        }

        const migrationModule = await import('file://' + migrationPath)

        migrations.push(migrationModule.default)
    }
    return migrations;
}

/**
 * @param {string[]} args
 * @returns {Promise<void>}
 */
async function main(args) {
    if (args.length === 0) {
        helpCmd()
        return
    }

    const migrations = await fetchMigrations();

    // Make sure migrations table exists before we do anything
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id serial PRIMARY KEY,
            "name" varchar(255) NOT NULL,
            created_ts timestamp NOT NULL
        );
    `)

    const command = args[0]

    const appliedMigrationsRes = await pool.query(
        `SELECT name FROM migrations ORDER BY created_ts ASC`);
    const appliedMigrations = appliedMigrationsRes.rows.map((row) => row.name)

    switch (command) {
        case 'help':
            helpCmd()
            break

        case 'create':
            if (args.length < 2) {
                console.error('Specify a name for your migration')
                process.exit(1)
            }

            const fileNameTemplate = args[1]

            await createMigration(fileNameTemplate);
            break

        case 'apply':
            let numToApply = args.length >= 2 ? parseInt(args[1]) : 0
            let appliedCount = 0;

            // If not a valid number
            if (isNaN(numToApply)) {
                console.error('Invalid integer')
                process.exit(1)
            }

            // If arg is null, print all. If arg > 0, print that number.
            if (numToApply > 0) {
                console.log(`Applying ${appliedCount} migrations`)
            } else {
                console.log(`Applying all migrations...`)
            }

            for (const migration of migrations) {
                if (appliedMigrations.includes(migration.name)) {
                    continue;
                }

                await migration.apply(pool)
                await pool.query(
                    `INSERT INTO migrations (name, created_ts) VALUES ($1, NOW())`,
                    [migration.name]);

                appliedMigrations.push(migration.name);
                appliedCount++;

                if (numToApply !== 0 && appliedCount >= numToApply) {
                    break
                }
            }
            console.log(`${appliedCount} applied`)

            break

        case 'revert':
            let numToRevert = args.length >= 2 ? parseInt(args[1]) : null

            // If arg is null, print all. If arg > 0, print that number.
            if (numToRevert === null) {
                console.error('Please specify how many migrations to revert')
                process.exit(1)
            }

            // If not a valid number
            if (isNaN(numToRevert)) {
                console.error('Invalid integer')
                process.exit(1)
            }

            if (numToRevert < 1) {
                console.error('Must specify at least 1')
                process.exit(1)
            }

            const totalCanBeReverted = Math.min(numToRevert, appliedMigrationsRes.rows.length)
            console.log(`Reverting ${totalCanBeReverted} migration(s)`)

            // Start on last index
            // Count backward until we reach the last index minus the number to revert (minimum of 0)
            for (let i = appliedMigrationsRes.rows.length - 1; i >= appliedMigrationsRes.rows.length - totalCanBeReverted; i--) {
                const migrationRow = appliedMigrationsRes.rows[i];
                console.log({
                    migrationRow,
                    i,
                })

                const migration = migrations.find(row => row.name === migrationRow.name);

                if (migration == null) {
                    console.error(`Couldn't find migration with name ${migrationRow.name}`);
                    process.exit(1)
                }

                await migration.revert(pool);
                await pool.query(`DELETE FROM migrations WHERE name = $1`, [migration.name]);

                console.log(`${totalCanBeReverted} migrations reverted`)
            }

            break;

        default:
            helpCmd()
            break
    }

    await pool.end()
}

main(process.argv.slice(2)).catch(console.error)