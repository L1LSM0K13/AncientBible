const nodemailer = require("nodemailer");

/**
 *
 * @param {string} email
 * @param {string} verificationToken
 * @returns {(function(*, *): Promise<any>)|*}
 */
const sendVerificationEmail = (email, verificationToken) => async (/** @type {any} */ req, /** @type {any} */ res) => {

    let verificationLink = `https://${process.env.APP_DOMAIN}/verify?token=${verificationToken}`;
    // let verificationLink = `http://localhost:4000/verify?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const info = await transporter.sendMail({
        from: `"Nico M ☦️" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "AncientBible: Verify your email",
        text: `Thank you for signing up with us! Verify your email by clicking this link: ${verificationLink}`,
    });

    console.log(info.messageId)
}

module.exports = { sendVerificationEmail };