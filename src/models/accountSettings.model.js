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

/**
 *
 * @param {number} id
 * @returns {Promise<any>}
 */
const fetchUserInfo = async (id) => {
    const results = await pool.query(`select name, email, user_highlights.id 
        as highlight_id, user_notes.id 
        as note_id, users.id 
        as user_id from user_notes, 
        user_highlights inner join users on user_highlights.user_id = users.id where users.id = $1;`,
        [id])

    return results.rows
}

module.exports = { deleteUser, updateName, updateEmail, updatePassword, fetchUserInfo };