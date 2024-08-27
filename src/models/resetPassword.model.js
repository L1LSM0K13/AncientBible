const { pool } = require("../../config/dbConfig");
const sgMail = require('@sendgrid/mail')
const bcrypt = require("bcrypt");

/**
 *
 * @param {string} email
 * @param {string} generatedToken
 * @returns {Promise<any>}
 */
const insertTokenToUser = async (email, generatedToken) => {
    const results = await pool.query(`UPDATE users SET passwordreset_token = $1 WHERE email = $2`, [generatedToken, email])

    return results.rows
}

/**
 *
 * @param {string} password
 * @param {string} email
 * @returns {Promise<any>}
 */
const updatePassword = async (password, email) => {
    const newHashedPassword = await bcrypt.hash(password, 10)

    await pool.query(`UPDATE users SET passwordreset_token = $1 WHERE email = $2`, [null, email])
    await pool.query(`UPDATE users SET password = $1 WHERE email = $2`, [newHashedPassword, email])
}

/**
 *
 * @param {string} email
 * @param {string} generatedToken
 * @returns {Promise<void>}
 */
const sendPasswordResetEmail = async (email, generatedToken) => {
    const encodedEmail = encodeURIComponent(email)
    // let verificationLink = `http://localhost:4000/users/enterNewPassword?token=${generatedToken}&email=${encodedEmail}`;
    let verificationLink = `https://${process.env.APP_DOMAIN}/users/enterNewPassword?token=${generatedToken}&email=${encodedEmail}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: 'nico@ancientbible.org',
        subject: "Ancientbible: reset your password",
        text: `To reset your password, click this link: ${verificationLink}`
    }
    sgMail.send(msg).then(() => {console.log('Email Sent')}).catch((err) => {console.error(err)})

}

module.exports = {
    insertTokenToUser,
    updatePassword,
    sendPasswordResetEmail
}