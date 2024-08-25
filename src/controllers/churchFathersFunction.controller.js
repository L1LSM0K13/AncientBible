const { getUserNotesFathers, getUserHighlightsFathers} = require('../models/fetchNotesAndHighlights.model')

/**
 *
 * @param {any} req
 * @param {any} res
 * @param {any} pool
 * @returns {Promise<{selectedBook: *|string, nextBook: *|string, isAuth: *, selectedChapter: number|number, bookTitleOptions: *[], bookChapters: *[], nextChapter: *, userHighlightsFathers: *[], previousChapter: number, bookText: *[], userNotesFathers: *[], previousBook: *|string}>}
 */
const fathersQueryController = async (req, res, pool) => {
    const { defaultRender } = require('../../src/utils/defaultValues');

    // const [
    //     userNotesRes,
    //     userHighlightsRes,
    // ] = await Promise.all([
    //     getUserNotesFathers(pool, user_id),
    //     getUserHighlightsFathers(pool, user_id),
    // ]);
    //
    // const userNotes = userNotesRes;
    // const userHighlights = userHighlightsRes;

    // Rendering the data
    const isAuth = req.isAuthenticated();
    const renderData = {
        // userNotesFathers: userNotes,
        // userHighlightsFathers: userHighlights,
        isAuth: isAuth
    };


    await defaultRender(req, res, isAuth, '../public/views/fathers', renderData)
    return renderData;
}

module.exports = { fathersQueryController };