/**
 *
 * @param {any} pool
 * @param {number} user_id
 * @returns {Promise<any[]>}
 */
const getUserNotes = async (pool, user_id) => {
    const userNoteQuery = `SELECT id, user_id, verse_id, book_title, chapter_number, verse_number, text FROM user_notes WHERE user_id = $1 ORDER BY verse_id`;
    const results = await pool.query(userNoteQuery, [user_id]);

    return results.rows;
}

/**
 *
 * @param {any} pool
 * @param {number} user_id
 * @returns {Promise<any[]>}
 */
const getUserNotesFathers = async(pool, user_id) => {
    const userNoteQuery = `SELECT * FROM user_notes WHERE user_id = $1 ORDER BY fathers_id`;
    const results = await pool.query(userNoteQuery, [user_id]);

    return results.rows;
}

/**
 *
 * @param {any} pool
 * @param {number} user_id
 * @returns {Promise<any[]>}
 */
const getUserHighlights = async (pool, user_id) => {
    const userHighlightQuery = `SELECT * FROM user_highlights WHERE user_id = $1 ORDER BY verse_id`;
    const results = await pool.query(userHighlightQuery, [user_id]);

    return results.rows;
}

/**
 *
 * @param {any} pool
 * @param {number} user_id
 * @returns {Promise<any[]>}
 */
const getUserHighlightsFathers = async (pool, user_id) => {
    const userHighlightQuery = `SELECT * FROM user_highlights WHERE user_id = $1 ORDER BY fathers_id`;
    const results = await pool.query(userHighlightQuery, [user_id]);

    return results.rows;
}

module.exports = {
    getUserNotes,
    getUserHighlights,
    getUserNotesFathers,
    getUserHighlightsFathers
}