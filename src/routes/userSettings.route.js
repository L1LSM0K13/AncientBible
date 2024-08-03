const express = require('express');
const router = express.Router();
const { defaultRender } = require('../utils/defaultValues');
const { deleteAccount, updateUserInfo, displayUserInfo } = require("../controllers/userSettings.controller");

// GET account settings
router.get('/account', async (req, res) => {

    const { userInfo, user_id } = await displayUserInfo(req, res)

    defaultRender(req, res, true, '../public/views/account', { userInfo, user_id })
})

// Deletes account, deleting all of its child info with it, then runs the logout function.
router.post('/account/action/delete', (req, res) => {
    deleteAccount(req, res);
    req.logout((err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/');
    })
})

/**
 * Updates name, email address, and password, if either one is null it will skip it from being queried
 * into the database
 *
 * Updating password will re-encrypt the password via bcyrpt.
 * this will use the same password criteria for the register model.
 */
router.post('/account', updateUserInfo)


module.exports = router;