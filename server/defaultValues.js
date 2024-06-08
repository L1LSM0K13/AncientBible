async function defaultRender(req, res, isAuth, template, data) {
	const loggedIn = isAuth;
	let errors = [];
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
