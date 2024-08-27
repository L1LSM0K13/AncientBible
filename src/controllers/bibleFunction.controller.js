const { getUserNotes, getUserHighlights } = require('../models/fetchNotesAndHighlights.model');

/**
 *
 * @param {any} req
 * @param {any} res
 * @param {any} pool
 * @returns {Promise<{selectedBook: *|string, nextBook: *|string, isAuth: *, selectedChapter: number|number, bookTitleOptions: *[], bookChapters: *[], nextChapter: *, previousChapter: number, bookText: *[], userNotes: *[], userHighlights: *[], previousBook: *|string}>}
 */
const bibleQueryController = async (req, res, pool) => {
    const { defaultRender } = require('../../src/utils/defaultValues');

    const user_id = req.user ? req.user.id : null
    const isAuth = req.isAuthenticated();

    // Queries all values at once
    if (isAuth) {
        const [
            userNotesRes,
            userHighlightsRes,
        ] = await Promise.all([
            getUserNotes(pool, user_id),
            getUserHighlights(pool, user_id),
        ]);

        // Queried note and highlight data
        const userNotes = userNotesRes;
        const userHighlights = userHighlightsRes;

    const renderData = {
        userNotes: userNotes,
        userHighlights: userHighlights,
        isAuth: isAuth
    };
        await defaultRender(req, res, true, '../public/views/scripture', renderData)
        return renderData;
    } else {
        const renderData = {
            isAuth: isAuth
        };
        await defaultRender(req, res, false, '../public/views/scripture', renderData)
        return renderData;
    }


}

module.exports = { bibleQueryController };