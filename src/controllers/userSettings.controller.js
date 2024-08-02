const { deleteUser, updateName, updateEmail, updatePassword } = require('../models/accountSettings.model')
const { defaultRender } = require("../utils/defaultValues");

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const deleteAccount = async (req, res) => {

    const user_id = req.user.id

    await deleteUser(user_id);
};

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const updateNameAndRedirect = async (req, res) => {
    const { name } = req.body
    const user_id = req.user.id

    if (name === null) {
        return
    }

    await updateName(name, user_id)
    res.redirect('/users/account')
}

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const updateEmailAndRedirect = async (req, res) => {
    const { email } = req.body
    const user_id = req.user.id

    if (email === null) {
        return
    }

    await updateEmail(email, user_id)
    res.redirect('/users/account')
}

// TODO make sure this does not mess up password encryption
/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<void>}
 */
const updatePasswordAndRedirect = async (req, res) => {
    const { password, confirmPass } = req.body
    const user_id = req.user.id

    // Checks for password matches these criteria, renders the proper errors
    let errors = []
    if (password.length < 8) {
        errors.push({
            message: "password should be at least 8 characters long.",
        });
    }
    if (password !== confirmPass) {
        errors.push({ message: "passwords must match." });
    }
    if (errors.length > 0) {
        await defaultRender(req, res, false, "../public/views/account", { errors });
    }

    try {
        await updatePassword(password, user_id)
        res.redirect('/users/account')
    } catch (err) {
        res.status(400).send(err, "Didn't work, check console...")
    }

}

module.exports = { deleteAccount, updatePasswordAndRedirect, updateNameAndRedirect, updateEmailAndRedirect }