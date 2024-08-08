const express = require('express');
const router = express.Router();

const { defaultRender } = require('../utils/defaultValues');
const {sendPasswordEmail, changePassword} = require("../controllers/resetPassword.controller");

router.get('/resetPassword', async (req, res) => {
    await defaultRender(req, res, false, '../public/views/passwordResetPages/resetPassword', {})
})
router.post('/resetPassword', sendPasswordEmail)

router.get('/enterNewPassword', async (req, res) => {
    const { token, email } = req.query

    await defaultRender(req, res, false, '../public/views/passwordResetPages/enterNewPassword', {token, email})
})
router.post('/enterNewPassword/action/passwordReset', changePassword)


module.exports = router;