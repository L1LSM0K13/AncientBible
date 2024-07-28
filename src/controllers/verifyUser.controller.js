const { pool } = require('../../config/dbConfig');

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<*>}
 */
const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        const results = await pool.query(`SELECT * FROM users WHERE email_token = $1`, [token]);
        const user = results.rows[0]

        if (!user) {
            return res.status(400).send('Invalid token.')
        }

        await pool.query(`UPDATE users SET is_verified = $1, email_token = $2 WHERE id = $3`, [true, null, user.id])

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    verifyUser
}