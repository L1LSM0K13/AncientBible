// Imports
const path = require("path");

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
require("dotenv").config({ path: "../.env" });

const { pool } = require("../config/dbConfig");
const initializePassport = require("../config/passportConfig");
const { bibleQuery } = require("./bibleQuery");
const { fathersQuery } = require("./fathersQuery");
const { register } = require("./register");

const app = express();
const PORT = process.env.PORT || 4000;

initializePassport(passport);

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
	res.locals.user = req.isAuthenticated
		? req.isAuthenticated()
			? req.user.name
			: null
		: null;
});

app.get("/", (req, res) => {
	res.render("../public/views/index", {
		loggedIn: loggedIn,
		user: loggedIn ? user.name: null;

	});
});

app.get("/users/register", checkAuthenticated, (req, res) => {
	res.render("../public/views/register");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
	res.render("../public/views/login");
});

bibleQuery(app, pool);
fathersQuery(app, pool);
try {
	register(app, pool);
} catch (error) {
	console.error(error);
}

app.get("/users/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
	});
	req.flash("success_msg", "You have logged out");
	res.redirect("/");
});

app.post(
	"/users/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/users/login",
		failureFlash: true,
	})
);

/**
 * @param {{ isAuthenticated: () => any; }} req
 * @param {{ redirect: (arg0: string) => any; }} res
 * @param {() => void} next
 */
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
