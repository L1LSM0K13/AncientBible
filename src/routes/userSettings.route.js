const express = require('express');
const router = express.Router();
const { defaultRender } = require('../utils/defaultValues');
const { deleteAccount, updateNameAndRedirect, updateEmailAndRedirect } = require("../controllers/userSettings.controller");

// GET account settings
router.get('/account', (req, res) => {
    defaultRender(req, res, true, '../public/views/account', {});
})

// Deletes account, deleting all of its child info with it, then runs the logout function.s
router.post('/account/action/delete', (req, res) => {
    deleteAccount(req, res);
    req.logout((err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/');
    })
})

// Updates name or email address, if either one is null it will skip it from being queried.
router.post('/account/action/changeName', (req, res) => {
    updateNameAndRedirect(req, res);
})

router.post('/account/action/changeEmail', (req, res) => {
    updateEmailAndRedirect(req, res);
})

module.exports = router;