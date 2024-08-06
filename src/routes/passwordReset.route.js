const express = require('express');
const router = express.Router();

const { defaultRender } = require('../utils/defaultValues');

router.get('/resetPassword', async (req, res) => {
    await defaultRender(req, res, false, '../public/views/resetPassword', {})
})

router.post('/resetPassword', async (req, res) => {
    await defaultRender(req, res, false, '../public/views/resetPassword', {})
})

module.exports = router;