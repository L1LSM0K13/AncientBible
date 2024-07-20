const { pool } = require('../../config/dbConfig')

/**
 *
 * @param {number} user_id
 * @param {number} verse_id
 * @param {number} fathers_id
 * @param {string} highlight_color
 * @returns {Promise<any[]>}
 */
const createHighlight = async (user_id, verse_id, fathers_id, highlight_color) => {
    // Inserts the highlight
    const results = await pool.query(
        `INSERT INTO user_highlights (user_id, verse_id, fathers_id, highlight_color) VALUES ($1, $2, $3, $4) RETURNING id, user_id, verse_id, fathers_id, highlight_color`,
        [user_id, verse_id, fathers_id, highlight_color]
    );

    return results.rows;
}

/**
 *
 * @param {number} user_id
 * @param {number} verse_id
 * @param {number} fathers_id
 * @returns {Promise<any[]>}
 */
const deleteHighlight = async (user_id, verse_id, fathers_id) => {
    // Deletes the highlight

    // Checks for highlight with a fathers id

    // TODO make sure this is compatible once the fathers highlights are fixed
    let results;
    if (fathers_id === null) {
        results = await pool.query(
            `DELETE FROM user_highlights WHERE (user_id, verse_id, fathers_id) = ($1, $2, $3) RETURNING id, user_id, verse_id, fathers_id, highlight_color`,
            [user_id, verse_id, fathers_id]
        )
    } else {
        results = await pool.query(
            `DELETE FROM user_highlights WHERE (user_id, verse_id) = ($1, $2) RETURNING id, user_id, verse_id, fathers_id, highlight_color`,
            [user_id, verse_id]
        )
    }

    return results.rows;
}

module.exports = { createHighlight, deleteHighlight }