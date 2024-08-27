// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

/**
 *
 * @param {string} email
 * @param {string} verificationToken
 * @returns {Promise<any>}
 */
const sendVerificationEmail = async (email, verificationToken) => {

    let verificationLink = `https://${process.env.APP_DOMAIN}/verify?token=${verificationToken}`;
    // let verificationLink = `http://localhost:4000/verified?token=${verificationToken}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: 'nico@ancientbible.org',
        subject: "AncientBible: Verify your email",
        text: `Thank you for signing up with us! Verify your email by clicking this link: ${verificationLink}`,
    }
    sgMail.send(msg).then(() => {console.log('Email Sent')}).catch((err) => {console.error(err)})
}

module.exports = { sendVerificationEmail };