const { pool } = require('../../config/dbConfig');
const bcrypt = require('bcrypt')

/**
 * @param {number} id
 * @returns {Promise<void>}
 * */
const deleteUser = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = $1`,
        [id]);
}

/**
 *
 * @param {string} name
 * @param {number} id
 * @returns {Promise<void>}
 */
const updateName = async (name, id) => {
    await pool.query(`UPDATE users SET name = $1 WHERE id = $2`,
        [name, id])
}

/**
 *
 * @param {string} email
 * @param {number} id
 * @returns {Promise<void>}
 */
const updateEmail = async (email, id) => {
    await pool.query(`UPDATE users SET email = $1 WHERE id = $2`,
        [email, id])
}

/**
 *
 * @param {string} password
 * @param {number} id
 * @returns {Promise<void>}
 */
const updatePassword = async (password, id) => {

    const newHashedPassword = await bcrypt.hash(password, 10)

    await pool.query(`UPDATE users SET password = $1 WHERE id = $2`,
        [newHashedPassword, id])
}

module.exports = { deleteUser, updateName, updateEmail, updatePassword };