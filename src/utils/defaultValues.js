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
	let errors = data.errors || [];
	const loggedIn = isAuth;
	try {
		res.render(template, {
			loggedIn,
			errors,
			name: data.name || '',
			email: data.email || '',
			...data,
		});
	} catch (err) {
		console.log(err);
	}
}

module.exports = { defaultRender };
