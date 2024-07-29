const { getBookTitles, getBookChapters, getBookText } = require('../models/bibleFunction.model');
const { getUserNotes, getUserHighlights } = require('../models/fetchNotesAndHighlights.model');
const {defaultRender} = require("../utils/defaultValues");

/**
 *
 * @param {any} req
 * @param {any} res
 * @param {any} pool
 * @returns {Promise<{selectedBook: *|string, nextBook: *|string, isAuth: *, selectedChapter: number|number, bookTitleOptions: *[], bookChapters: *[], nextChapter: *, previousChapter: number, bookText: *[], userNotes: *[], userHighlights: *[], previousBook: *|string}>}
 */
const bibleQueryController = async (req, res, pool) => {
    const { defaultRender } = require('../../src/utils/defaultValues');
    const defaultBook = req.query.book || 'John';
    const defaultChapter = parseInt(req.query.chapter) || 1;

    const user_id = req.user ? req.user.id : null;

    // Queries all values at once
    const [
        bookTitleRes,
        bookChapterRes,
        bookTextRes,
        userNotesRes,
        userHighlightsRes,
    ] = await Promise.all([
        getBookTitles(pool),
        getBookChapters(pool, defaultBook),
        getBookText(pool, defaultBook, defaultChapter),
        getUserNotes(pool, user_id),
        getUserHighlights(pool, user_id),
    ]);

    // Maps all the data, book titles, chapter numbers, and the text of that chapter
    const bookTitles = bookTitleRes.map((row) => row.book);
    const chapters = bookChapterRes.map((row) => row.chapter_number);
    const bookText = bookTextRes;

    // Queried note and highlight data
    const userNotes = userNotesRes;
    const userHighlights = userHighlightsRes;


    // PAGINATION
    let nextBook = defaultBook;
    let nextChapter = defaultChapter + 1;
    let previousBook = defaultBook;
    let previousChapter = defaultChapter - 1;

    if (nextChapter > chapters.length) {
        const currentBookIndex = bookTitles.indexOf(defaultBook);
        nextBook = bookTitles[(currentBookIndex + 1) % bookTitles.length];
        const nextChapterRes = await getBookChapters(pool, nextBook);
        nextChapter = nextChapterRes[0].chapter_number;
    }
    if (previousChapter < 1) {
        const currentBookIndex = bookTitles.indexOf(defaultBook);
        previousBook = bookTitles[(currentBookIndex - 1 + bookTitles.length) % bookTitles.length];
        const previousChapterRes = await getBookChapters(pool, previousBook);
        previousChapter = previousChapterRes[previousChapterRes.length - 1].chapter_number;
    }

    const isAuth = req.isAuthenticated();
    const renderData = {
        bookText: bookText,
        bookChapters: chapters,
        bookTitleOptions: bookTitles,
        selectedBook: defaultBook,
        selectedChapter: defaultChapter,
        nextBook: nextBook,
        nextChapter: nextChapter,
        previousBook: previousBook,
        previousChapter: previousChapter,
        userNotes: userNotes,
        userHighlights: userHighlights,
        isAuth: isAuth
    };

    if (isAuth) {
        await defaultRender(req, res, true, '../public/views/scripture', renderData)
    } else {
        await defaultRender(req, res, false, '../public/views/scripture', renderData)
    }

    return renderData;
}

module.exports = { bibleQueryController };