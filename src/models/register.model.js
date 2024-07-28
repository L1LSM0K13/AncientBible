const { pool } = require('../../config/dbConfig');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 *
 * @param {string} email
 * @returns {Promise<any[]>}
 */
const checkEmailAvailability = async (email) => {
    const results = await pool.query(`SELECT * FROM users WHERE email = $1`,
        [email]);
    return results.rows
}

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<any[]>}
 */
const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedToken = crypto.randomBytes(16).toString('hex');

    const results = await pool.query(`INSERT INTO users (name, email, password, email_token)
        VALUES ($1, $2, $3, $4) RETURNING id, name, email, password, email_token`, [name, email, hashedPassword, generatedToken])

    return results.rows
}

module.exports = {
    checkEmailAvailability,
    createUser,
}