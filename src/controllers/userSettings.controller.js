const { deleteUser, updateName, updateEmail, updatePassword } = require('../models/accountSettings.model')
const { defaultRender } = require("../utils/defaultValues")
const { checkEmailAvailability } = require("../models/register.model");

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<any>}
 */
const deleteAccount = async (req, res) => {
    const user_id = req.user.id
    await deleteUser(user_id)
}

/**
 *
 * @param {any} req
 * @param {any} res
 * @returns {Promise<void>}
 */
const updateUserInfo = async (req, res) => {
    const user_id = req.user.id
    let { name, email, password, confirmPass } = req.body

    const updates = []
    const errors = []

    name = name ? name.trim() : ''
    email = email ? email.trim() : ''
    password = password ? password.trim() : ''
    confirmPass = confirmPass ? confirmPass.trim() : ''

    try {
        // Checks if user already exists
        const users = await checkEmailAvailability(email);
        if (users.length > 0) {
            errors.push({ message: "User with this email already exists" });
            await defaultRender(req, res, true, "../public/views/account", { errors });

        } else {

        // Pushes the update operations into an array and then uses that Promise.all() to execute them
        switch (true) {
            case !!name && !!email && !!password && !!confirmPass:
                updates.push(updateName(name, user_id))
                updates.push(updateEmail(email, user_id))

                // Checks if user meets all the criteria for password
                if (password.length < 8) {
                    errors.push({
                        message: "password should be at least 8 characters long.",
                    })
                }
                if (password !== confirmPass) {
                    errors.push({ message: "passwords must match." })
                }
                if (errors.length > 0) {
                    await defaultRender(req, res, true, "../public/views/account", { errors })
                } else {
                    await updatePassword(password, user_id)
                }
                break
            case !!name:
                updates.push(updateName(name, user_id))
                break
            case !!email:
                updates.push(updateEmail(email, user_id))
                break
            case !!password && !! confirmPass:

                // Checks if user meets all the criteria for password
                if (password.length < 8) {
                    errors.push({
                        message: "password should be at least 8 characters long.",
                    })
                }
                if (password !== confirmPass) {
                    errors.push({ message: "passwords must match." })
                }
                if (errors.length > 0) {
                    await defaultRender(req, res, true, "../public/views/account", { errors })
                } else {
                    await updatePassword(password, user_id)
                }
                break
        }
            await Promise.all(updates)
            res.redirect('/users/account')
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { deleteAccount, updateUserInfo }