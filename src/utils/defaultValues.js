/**
 *
 * @param {any} req
 * @param {any} res
 * @param {boolean} isAuth
 * @param {string} template
 * @param {any} data
 * @returns {Promise<void>}
 */
async function defaultRender(req, res, isAuth, template, data) {

	/**
     * @type {string[]}
     */
	let errors = [];
	const loggedIn = isAuth;
	try {
		res.render(template, {
			loggedIn,
			errors,
			...data,
		});
	} catch (err) {
		console.log(err);
	}
}

module.exports = { defaultRender };
