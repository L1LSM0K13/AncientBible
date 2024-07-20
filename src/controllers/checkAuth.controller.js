/**
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Promise<void>}
 */

// Check authentication
const checkAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next();
}

module.exports = { checkAuth }