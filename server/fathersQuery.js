function fathersQuery(app) {
	app.get("/users/fathers", (req, res) => {
		if (req.isAuthenticated()) {
			res.render("../public/views/fathers", { loggedIn: true });
		} else {
			res.render("../public/views/fathers", { loggedIn: false });
		}
	});
}

module.exports = { fathersQuery };
