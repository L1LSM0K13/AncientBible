// Imports
const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const { pool } = require("../config/dbConfig");
const initializePassport = require("../config/passportConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 4000;

const { bibleQuery } = require("./bibleQuery");
const { fathersQuery } = require("./fathersQuery");
const { register } = require("./register");

if (process.env !== "production") {
	require("dotenv").config({ path: "../.env" });
}

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

app.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		res.render("../public/views/index", {
			loggedIn: true,
			user: req.user.name,
		});
	} else {
		res.render("../public/views/index", { loggedIn: false });
	}
});

app.get("/users/register", checkAuthenticated, (req, res) => {
	res.render("../public/views/register", { loggedIn: false });
});

app.get("/users/login", checkAuthenticated, (req, res) => {
	res.render("../public/views/login", { loggedIn: false });
});

bibleQuery(app, pool);
fathersQuery(app, pool);
register(app, pool);

app.get("/users/logout", (req, res) => {
	req.logOut((err) => {
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

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
