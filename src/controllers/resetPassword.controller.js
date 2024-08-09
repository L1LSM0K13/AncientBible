const {defaultRender} = require("../utils/defaultValues");
const {checkEmailAvailability} = require("../models/register.model");
const {insertTokenToUser, updatePassword, sendPasswordResetEmail} = require("../models/resetPassword.model");
const crypto = require("crypto");

const generatedToken = crypto.randomBytes(32).toString('hex');

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const sendPasswordEmail = async (req, res) => {
    let { email } = req.body
    let errors = []

    const users = await checkEmailAvailability(email);

    if (users.length <= 0) {
        errors.push({ message: "No user with that email exists" });
        await defaultRender(req, res, false, "../public/views/passwordResetPages/resetPassword", { errors });
    } else if (users[0].is_verified === false) {
        errors.push({message: "This user is not verified yet"});
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
    let { email, token } = req.body
    let errors = []

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
            return await defaultRender(req, res, false, "../public/views/passwordResetPages/enterNewPassword", { errors, token, email });
        } else {
            await updatePassword(password, email)

            req.flash('success_msg', 'Password reset.')
            res.redirect('/users/login')
        }
    }
}

module.exports = {
    sendPasswordEmail,
    changePassword
}