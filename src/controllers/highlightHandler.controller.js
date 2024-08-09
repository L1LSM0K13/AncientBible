const { createHighlight, deleteHighlight } = require("../models/highlightHander.model");

/**
 *
 * @param {any} page
 * @returns {(function(*, *): Promise<any[]>)|*}
 */
const highlightText = (page) => async (/** @type {any} */ req, /** @type {any} */ res) => {
    const user_id = req.user.id;
    const bibleLocationParams = req.query
    let { hasHighlight, verse_id, fathers_id, highlight_color } = req.body;

    try {
        let results;
        const queryString = new URLSearchParams(bibleLocationParams).toString()

        if (!hasHighlight) {
            results = await createHighlight(user_id, verse_id, fathers_id, highlight_color);
        } else {
            results = await deleteHighlight(user_id, verse_id, fathers_id);
        }

        console.table(results);
        res.redirect(`${page}?${queryString}`);
    } catch (err) {
        res.status(500).send("could not send request");
        console.log(err)
    }
}

module.exports = { highlightText };