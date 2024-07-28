const express = require('express');
const router = express.Router();
const { defaultRender } = require('../utils/defaultValues');

// GET account settings

router.get('/account', (req, res) => {
    defaultRender(req, res, true, '../public/views/account', {

    });
})

module.exports = router;