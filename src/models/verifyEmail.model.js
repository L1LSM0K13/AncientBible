const nodemailer = require("nodemailer");

/**
 *
 * @param {string} email
 * @param {string} verificationToken
 * @returns {Promise<any>}
 */
const sendVerificationEmail = async (email, verificationToken) => {

    // TODO replace local with launch version of the link
    let verificationLink = `https://${process.env.APP_DOMAIN}/verify?token=${verificationToken}`;
    // let verificationLink = `http://localhost:4000/verified?token=${verificationToken}`;

    // Creates transporter
    const transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
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