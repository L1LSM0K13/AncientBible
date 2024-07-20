const express = require('express');
const router = express.Router();
const { bibleQueryController } = require('../controllers/bibleFunction.controller')
const { pool } = require('../../config/dbConfig');

// Loads bible
router.get('/bible', async (req, res) => {
    await bibleQueryController(req, res, pool)
})

module.exports = router;