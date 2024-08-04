const express = require('express');
const router = express.Router();
const { verifyUser } = require("../controllers/verifyUser.controller");
const { defaultRender } = require("../utils/defaultValues");
const { checkAuth } = require("../controllers/checkAuth.controller");


router.post('/verified', async (req, res) => {
    await verifyUser(req, res)
})

router.get('/verify', checkAuth, async (req, res) => {
    await defaultRender(req, res, false, '../public/views/verify', {})
})

module.exports = router;