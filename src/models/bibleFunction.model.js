/**
 *
 * @param {any} pool
 * @returns {Promise<any[]>}
 */
const getBookTitles = async (pool) => {
    const bookTitleOptionsQuery = `SELECT DISTINCT book, book_order FROM bible_eng ORDER BY book_order;`
    const results = await pool.query(bookTitleOptionsQuery);

    return results.rows;
}

/**
 *
 * @param {any} pool
 * @param {string} book
 * @returns {Promise<any[]>}
 */
const getBookChapters = async (pool, book) => {
    const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM bible_eng WHERE book = $1 ORDER BY chapter_number`;
    const results = await pool.query(bookChaptersQuery, [book]);

    return results.rows;
}

/**
 *
 * @param {any} pool
 * @param {string} book
 * @param {number} chapter
 * @returns {Promise<any[]>}
 */
const getBookText = async (pool, book, chapter) => {
    const bookTextQuery = `SELECT * FROM bible_eng WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;
    const results = await pool.query(bookTextQuery, [book, chapter]);

    return results.rows;
}

module.exports = {
    getBookTitles,
    getBookChapters,
    getBookText,
}