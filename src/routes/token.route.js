const express = require('express');
const router = express.Router();
const { verifyUser } = require("../controllers/verifyUser.controller");
const { defaultRender } = require("../utils/defaultValues");
const { checkAuth } = require("../controllers/checkAuth.controller");


router.get('/verify/:token', verifyUser, (req, res) => {
    defaultRender(req, res, false, '../public/views/verified', {})
})

router.get('/verify', checkAuth, (req, res) => {
    defaultRender(req, res, false, '../public/views/verify', {})
})

module.exports = router;