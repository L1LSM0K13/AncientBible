const express = require('express');
const router = express.Router();
const { fathersQueryController } = require('../controllers/churchFathersFunction.controller')
const { pool } = require('../../config/dbConfig');

// Loads bible
router.get('/fathers', async (req, res) => {
    await fathersQueryController(req, res, pool)
})

module.exports = router;