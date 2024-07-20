const { pool } = require('../../config/dbConfig');

/**
 *
 * @param {string} noteText
 * @param {number} user_id
 * @param {number} verse_id
 * @param {number} fathers_id
 * @returns {Promise<any[]>}
 */
// Inserts note into DB
const createNote = async (noteText, user_id, verse_id, fathers_id) => {
    const results = await pool.query(
        `INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
        [noteText, user_id, verse_id, fathers_id]
    );

    return results.rows;
}

/**
 *
 * @param {number} note_id
 * @param {number} user_id
 * @returns {Promise<any[]>}
 */
// Deletes the note from the DB
const deleteNote = async (note_id, user_id) => {
    const results = await pool.query(
        `DELETE FROM user_notes WHERE (id, user_id) = ($1, $2) RETURNING id, text, user_id, verse_id, fathers_id`,
        [note_id, user_id]
    );

    return results.rows;
}

module.exports = { createNote, deleteNote };