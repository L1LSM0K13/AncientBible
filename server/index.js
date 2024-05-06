const express = require("express");
const { pool } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("../config/passportConfig");

if (process.env !== "production") {
	require("dotenv").config({ path: "../.env" });
}

const PORT = process.env.PORT || 4000;

const app = express();

initializePassport(passport);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("../public"));

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
	res.render("../public/views/index");
	res.sendFile(path.join(__dirname + "../public/views/index.ejs"));
});

app.get("/users/register", checkAuthenticated, (req, res) => {
	res.render("../public/views/register");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
	res.render("../public/views/login");
});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
	res.render("../public/views/dashboard", { user: req.user.name });
});

app.get("/users/bible", (req, res) => {
	res.render("../public/views/scripture");
});

app.get("/users/fathers", (req, res) => {
	res.render("../public/views/fathers");
});

app.get("/users/logout", (req, res) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
	});
	req.flash("success_msg", "You have logged out");
	res.redirect("/");
});

app.post("/users/register", async (req, res) => {
	let { name, email, password, password2 } = req.body;

	let errors = [];

	if (!name || !email || !password || !password) {
		errors.push({ message: "Please enter all fields." });
	}

	if (password.length < 8) {
		errors.push({ message: "password should be at least 8 characters long." });
	}

	if (password !== password2) {
		errors.push({ message: "passwords must match." });
	}

	if (errors.length > 0) {
		res.render("../public/views/register", { errors });
	} else {
		// Form validation has passed

		let hashedPassword = await bcrypt.hash(password, 10);

		pool.query(
			`SELECT * FROM users
      WHERE email = $1`,
			[email],
			(err, results) => {
				if (err) {
					throw err;
				}

				if (results.rows.length > 0) {
					errors.push({ message: "User with this email already exists" });
					res.render("../public/views/register", { errors });
				} else {
					pool.query(
						`INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, password`,
						[name, email, hashedPassword],
						(err, results) => {
							if (err) {
								throw err;
							}
							console.log(results.rows);
							req.flash(
								"success_msg",
								`You are now registered as ${name}. Please log in.`
							);
							res.redirect("/users/login");
						}
					);
				}
			}
		);
	}
});

app.post(
	"/users/login",
	passport.authenticate("local", {
		successRedirect: "/users/dashboard",
		failureRedirect: "/users/login",
		failureFlash: true,
	})
);

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/users/dashboard");
	}
	next();
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/users/login");
}

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
