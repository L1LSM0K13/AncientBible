const nodemailer = require("nodemailer");

/**
 *
 * @param {string} email
 * @param {string} verificationToken
 * @returns {(function(*, *): Promise<any>)|*}
 */
const sendVerificationEmail = async (email, verificationToken) => {

    // let verificationLink = `https://${process.env.APP_DOMAIN}/verify?token=${verificationToken}`;
    let verificationLink = `http://localhost:4000/verify?token=${verificationToken}`;

    // Creates transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    console.log({message: '1: TRANSPORT CREATED'})

    const info = await transporter.sendMail({
        from: `"Nico M ☦️" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "AncientBible: Verify your email",
        text: `Thank you for signing up with us! Verify your email by clicking this link: ${verificationLink}`,
    });

    console.log({message: '2: EMAIL GENERATED'})
    console.log(info.messageId)
}

module.exports = { sendVerificationEmail };