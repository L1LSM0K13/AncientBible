function register(app, pool) {
	const { defaultRender } = require("./defaultValues");
	const bcrypt = require("bcrypt");
	// TODO
	// const crypto = require("crypto");

	app.post("/users/register", async (req, res) => {
		let { name, email, password, password2 } = req.body;

		let errors = [];

		if (!name || !email || !password || !password) {
			errors.push({ message: "Please enter all fields." });
		}

		if (password.length < 8) {
			errors.push({
				message: "password should be at least 8 characters long.",
			});
		}

		if (password !== password2) {
			errors.push({ message: "passwords must match." });
		}

		if (errors.length > 0) {
			await defaultRender(req, res, false, "../public/views/register", { errors });
		} else {
			// Form validation has passed

			let hashedPassword = await bcrypt.hash(password, 10);
			// TODO
			// let emailToken = crypto.randomBytes(64).toString("hex");

			await pool.query(
				`SELECT * FROM users WHERE email = $1`,
				[email], (err, results) => {
					if (err) {
						throw err;
					}

					if (results.rows.length > 0) {
						errors.push({ message: "User with this email already exists" });
						defaultRender(req, res, false, "../public/views/register", {
							errors,
						});
					} else {
						pool.query(
							`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`,
							[name, email, hashedPassword], (err, results) => {
								if (err) {
									throw err;
								}
								console.table([results.rows]);
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

		// TODO
		// try {
		// 	let email_token = req.body.emailToken;
		//
		// 	if(!email_token) return res.status(404).send('email token was not found...')
		//
		// 	const results = await pool.query(`SELECT * FROM users WHERE email_token = $1`, [email_token]);
		// 	const users = results.rows.map((user) => {
		// 		if (users) {
		// 			user.email_token = null;
		// 			user.isVerified = true;
		// 		} else {
		// 			res.status(404).send('verification failed, invalid token');
		// 		}
		// 	});
		// } catch (err) {
		// 	console.error(err, "Error while registering user");
		// }
	});
}

module.exports = { register };
