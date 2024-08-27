const { pool } = require('../../config/dbConfig');

/**
 *
 * @param {string} noteText
 * @param {number} user_id
 * @param {number} verse_id
 * @param {number} fathers_id
 * @param {string} book_title
 * @param {number} chapter_number
 * @param {number} verse_number
 * @returns {Promise<any[]>}
 */
// Inserts note into DB
const createNote = async (noteText, user_id, verse_id, fathers_id, book_title, chapter_number, verse_number) => {

    const results = await pool.query(
        `INSERT INTO user_notes (text, user_id, verse_id, fathers_id, book_title, chapter_number, verse_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, text, user_id, verse_id, fathers_id, book_title, chapter_number, verse_number`,
        [noteText, user_id, verse_id, fathers_id, book_title, chapter_number, verse_number]
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