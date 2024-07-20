const express = require('express');
const router = express.Router();
const { highlightText } = require('../controllers/highlightHandler.controller');

router.post("/bible/action/highlight", highlightText('/users/bible'));
router.post("/fathers/action/highlight", highlightText('/users/fathers'));

module.exports = router;
