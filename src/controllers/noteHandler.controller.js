const { createNote, deleteNote } = require('../models/noteHandler.model');

/**
 *
 * @param {any} page
 * @returns {(function(*, *): Promise<any[]>)|*}
 */
const handleNoteAction = (page) => async (/** @type {any} */ req, /** @type {any} */ res) => {
    const user_id = req.user.id;
    const { note_id, noteText, verse_id, fathers_id } = req.body

    try {
        if (noteText) {
            const results = await createNote(noteText, user_id, verse_id, fathers_id);
            console.table(results);
            res.redirect(page);
            return;
        }

        if (note_id) {
            const results = await deleteNote(note_id, user_id);
            console.table(results);
            res.redirect(page);
            return;
        }

        res.status(404).send("No note text nor note id were specified");
    } catch (err) {
        res.status(500).send("could not send request");
    }
}

module.exports = { handleNoteAction };