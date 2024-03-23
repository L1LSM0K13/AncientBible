const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { pool } = require("../dbconfig");
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/users/register", (req, res) => {
	res.render("register");
});
app.get("/users/login", (req, res) => {
	res.render("login");
});
app.get("/users/dashboard", (req, res) => {
	res.render("dashboard", { user: "Omar" });
});

app.post("/users/register", async (req, res) => {
	let { name, email, password, passwordConf } = req.body;

	console.log({ name, email, password, passwordConf });

	let errors = [];

	if (!name || !email || !password || !passwordConf) {
		errors.push({ message: "Please enter all fields" });
	}

	if (password.length < 6) {
		errors.push({ message: "Password should be at least 6 characters long" });
	}

	if (password != passwordConf) {
		errors.push({ message: "Passwords do not match" });
	}

	if (errors.length > 0) {
		res.render("register", { errors });
	} else {
		//Form validation has passed
		let hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);

		pool.query(
			`SELECT * FROM users
			WHERE email = $1`,
			[email],
			(err, results) => {
				if (err) {
					throw err;
				}

				console.log("reaches here");
				console.log(results.rows);
			}
		);
	}
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
