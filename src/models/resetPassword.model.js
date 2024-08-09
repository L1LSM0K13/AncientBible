const { pool } = require("../../config/dbConfig");
const nodemailer = require("nodemailer");
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

    console.log({message: '1 CREATING TRANSPORTER...'})

    const transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    console.log({message: '2 TRANSPORTER CREATED...'})

    const info = await transporter.sendMail({
        from: `"Nico M ☦️" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "AncientBible: reset your password",
        text: `To reset your password, click this link: ${verificationLink}`
    })

    console.log({message: '3 EMAIL SENT...'})
    console.log(info.messageId)
}

module.exports = {
    insertTokenToUser,
    updatePassword,
    sendPasswordResetEmail
}