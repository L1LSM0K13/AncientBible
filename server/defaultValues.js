export function defaultRender(req, res, isAuth, template, data) {
	const loggedIn = isAuth;
	res.render(template, {
		loggedIn,
		...data,
	});
}
