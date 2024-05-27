const bcrypt = require("bcrypt");

function register(app, pool) {
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
			res.render("../public/views/register", { errors });
		} else {
			// Form validation has passed

			let hashedPassword = await bcrypt.hash(password, 10);

			await pool.query(
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
}

module.exports = { register };
