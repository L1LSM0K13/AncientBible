const { pool } = require('../../config/dbConfig');
const {defaultRender} = require("../utils/defaultValues");

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<*>}
 */
const verifyUser = async (req, res) => {
    try {

        console.log('VERIFYING...')

        const { token } = req.query;

        const results = await pool.query(`SELECT * FROM users WHERE email_token = $1`, [token]);
        const user = await results.rows[0]

        if (!user) {
            return res.status(400).send('Invalid token.')
        } else {
            await pool.query(`UPDATE users SET is_verified = $1, email_token = $2 WHERE id = $3`, [true, null, user.id])

            console.log('VERIFIED...')

            await defaultRender(req, res, false, '../public/views/verified', {})
        }

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    verifyUser
}