const fs = require('node:fs/promises')
const pathUtil = require('node:path')
const {pool} = require('../../config/dbConfig')

function helpCmd() {
    console.log(`<node> <migrate> [apply | revert] use \"apply\" to apply the migration. use \"revert\" to revert the migration.\n`)
    console.log(`To write a file use this command: node migrate create <migration-name>`)
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

  apply: async function (pool) {
    const results = await pool.query(\`\`)

    console.table(results.rows)
  },

  revert: async function (pool) {
    const results = await pool.query(\`\`)

    console.table(results.rows)
  }
}`

    await fs.writeFile(`./migrations/${fileName + '_' + formattedDate}.js`, template, (err) => {
        if (err) {
            console.error(err, 'could not write migrations')
        }
    })
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
    let numToApply = args.length >= 2 ? parseInt(args[1]) : null
    let fileNameTemplate = args.length >= 2 ? args[1] : null

    const appliedMigrationsRes = await pool.query(
        `SELECT name FROM migrations ORDER BY created_ts ASC`);
    const appliedMigrations = appliedMigrationsRes.rows.map((row) => row.name)

    switch (command) {
        case 'help':
            helpCmd()
            break

        case 'create':
            await createMigration(fileNameTemplate);
            break

        case 'apply':

            let appliedCount = 0;

            // If not a valid number
            if (isNaN(numToApply)) {
                console.error('Invalid integer')
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

                if (numToApply && appliedCount >= numToApply) {
                    break
                }
            }
            console.log(`${appliedCount} applied`)

            break

        case 'revert':

            // If not a valid number
            if (isNaN(numToApply)) {
                console.error('Invalid integer')
            }

            // If arg is null, print all. If arg > 0, print that number.
            if (numToApply > 0) {
                console.log(`Reverting ${numToApply} migrations`)
            } else {
                console.log(`Reverting all migrations`)
            }

            const revertMigration = [...appliedMigrationsRes.rows].reverse().slice(0, numToApply || appliedMigrationsRes.rows.length);
            for (const migrationRow of revertMigration) {
                const migration = migrations.find(row => row.name === migrationRow.name);

                await migration.revert(pool);
                await pool.query(`DELETE FROM migrations WHERE name = $1`, [migration.name]);
            }

            console.log(`${revertMigration.length} migrations reverted.`);

            break;

        default:
            helpCmd()
            break
    }
}

main(process.argv.slice(2)).catch(console.error)