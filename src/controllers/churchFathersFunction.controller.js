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

    const user_id = req.user ? req.user.id : null
    const isAuth = req.isAuthenticated();

    if (isAuth) {
        const [
            userNotesRes,
            userHighlightsRes,
        ] = await Promise.all([
            getUserNotesFathers(pool, user_id),
            getUserHighlightsFathers(pool, user_id),
        ]);

        const userNotes = userNotesRes;
        const userHighlights = userHighlightsRes;

        // Rendering the data
        const renderData = {
            userNotesFathers: userNotes,
            userHighlightsFathers: userHighlights,
            isAuth: isAuth
        };

        await defaultRender(req, res, true, '../public/views/fathers', renderData)
    } else {
        const renderData = {
            isAuth: isAuth
        };
        await defaultRender(req, res, false, '../public/views/fathers', renderData)
        return renderData;
    }


}

module.exports = { fathersQueryController };