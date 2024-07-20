const express = require('express');
const router = express.Router();
const { defaultRender } = require('../utils/defaultValues')

// Home page
router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        defaultRender(req, res, true, '../public/views/index', {
            user: req.isAuthenticated() ? req.user.name : null,
        })
    } else {
        defaultRender(req, res, false, '../public/views/index', {})
    }
})

// About page
router.get('/about',(req, res) => {

    if (req.isAuthenticated()) {
        defaultRender(req, res, true, '../public/views/about', {
            user: req.isAuthenticated() ? req.user.name : null,
        })
    } else {
        defaultRender(req, res, false, '../public/views/about', {})
    }
})

module.exports = router;