const { getBookTitles, getBookChapters, getBookText } = require('../models/churchFathersFunction.model')
const { getUserNotes, getUserHighlights } = require('../models/fetchNotesAndHighlights.model')

/**
 *
 * @param {any} req
 * @param {any} res
 * @param {any} pool
 * @returns {Promise<{selectedBook: *|string, nextBook: *|string, isAuth: *, selectedChapter: number|number, bookTitleOptions: *[], bookChapters: *[], nextChapter: *, userHighlightsFathers: *[], previousChapter: number, bookText: *[], userNotesFathers: *[], previousBook: *|string}>}
 */
const fathersQueryController = async (req, res, pool) => {
    const { defaultRender } = require('../../src/utils/defaultValues');
    const defaultBook = req.query.book || '1 Clement';
    const defaultChapter = parseInt(req.query.chapter) || 1;

    const user_id = req.user ? req.user.id : null

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

    const bookTitles = bookTitleRes.map((row) => row.book);
    const chapters = bookChapterRes.map((row) => row.chapter_number);
    const bookText = bookTextRes;

    const userNotes = userNotesRes;
    const userHighlights = userHighlightsRes;


    let nextBook = defaultBook;
    let nextChapter = defaultChapter + 1;
    let previousBook = defaultBook;
    let previousChapter = defaultChapter - 1;

    // PAGINATION
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

    // Rendering the data
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
        userNotesFathers: userNotes,
        userHighlightsFathers: userHighlights,
        isAuth: isAuth
    };

    // Rendering the page
    if (isAuth) {
        await defaultRender(req, res, true, '../public/views/fathers', renderData)
    } else {
        await defaultRender(req, res, false, '../public/views/fathers', renderData)
    }

    return renderData;
}

module.exports = { fathersQueryController };