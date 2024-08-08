const {defaultRender} = require("../utils/defaultValues");
const {checkEmailAvailability} = require("../models/register.model");
const {insertTokenToUser, updatePassword, sendPasswordResetEmail} = require("../models/resetPassword.model");
const crypto = require("crypto");
const {parseArgs} = require("node:util");

const generatedToken = crypto.randomBytes(32).toString('hex');

let errors = []

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const sendPasswordEmail = async (req, res) => {
    let { email } = req.body

    const users = await checkEmailAvailability(email);

    if (users.length <= 0) {
        errors.push({ message: "No user with that email exists" });
    }
    // @ts-ignore
    if (users.is_verified === false) {
        errors.push({message: "This user is not verified yet"});
    }
    if (errors.length > 0) {
        await defaultRender(req, res, false, "../public/views/passwordResetPages/resetPassword", { errors });
    } else {
        await insertTokenToUser(email, generatedToken)
        await sendPasswordResetEmail(email, generatedToken)
        await defaultRender(req, res, false, '../public/views/passwordResetPages/passwordEmailSent', {})
    }
}

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const changePassword = async (req, res) => {
    let { password, confirmPass } = req.body
    let { email } = req.body

    if (!generatedToken) {
        return res.status(400).send('Invalid token.')
    } else {
        // Checks if user information contains any of these errors
        if (password.length < 8) {
            errors.push({
                message: "password should be at least 8 characters long.",
            });
        }
        if (password !== confirmPass) {
            errors.push({ message: "passwords must match." });
        }
        if (errors.length > 0) {
            await defaultRender(req, res, false, "../public/views/passwordResetPages/enterNewPassword", { errors });
        } else {
            await updatePassword(password, email)

            req.flash('success_msg', 'Password reset.')
            res.redirect('/users/login')
        }
    }
            console.log({message: email})
}

module.exports = {
    sendPasswordEmail,
    changePassword
}