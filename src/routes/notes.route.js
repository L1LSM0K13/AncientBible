const express = require('express');
const router = express.Router();
const { handleNoteAction } = require('../controllers/noteHandler.controller');

router.post('/bible/action/note', handleNoteAction('/users/bible'));
router.post('/fathers/action/note', handleNoteAction('/users/fathers'));

module.exports = router;