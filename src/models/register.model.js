const { pool } = require('../../config/dbConfig');
const bcrypt = require('bcrypt');

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

    const results = await pool.query(`INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3) RETURNING id, name, email, password`, [name, email, hashedPassword])

    return results.rows
}

module.exports = {
    checkEmailAvailability,
    createUser,
}