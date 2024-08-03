const express = require('express');
const router = express.Router();
const { defaultRender } = require('../utils/defaultValues');
const { deleteAccount, updateUserInfo } = require("../controllers/userSettings.controller");

// GET account settings
router.get('/account', (req, res) => {
    defaultRender(req, res, true, '../public/views/account', {})
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
 * Updates name or email address, if either one is null it will skip it from being queried.
 *
 * Updating password will re-encrypt the password via bcyrpt.
 * this will use the same password criteria for the register model.
 */
router.post('/account', updateUserInfo)


module.exports = router;