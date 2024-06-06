async function defaultRender(req, res, isAuth, template, data) {
	const loggedIn = isAuth;
	try {
		res.render(template, {
			loggedIn,
			...data,
		});
	} catch (err) {
		console.log(err);
	}
}

module.exports = { defaultRender };
