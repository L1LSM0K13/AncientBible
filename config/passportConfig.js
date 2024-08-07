const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

/**
 *
 * @param {any} passport
 */
function initialize(passport) {
	console.log("Initialized");

	/**
	 *
	 * @param {string} email
	 * @param {string} password
	 * @param {any} done
	 */
	const authenticateUser = (email, password, done) => {
		pool.query(
			`SELECT * FROM users WHERE email = $1`,
			[email],
			(err, results) => {
				if (err) {
					throw err;
				}
				console.log(results.rows);

				if (results.rows.length > 0) {
					const user = results.rows[0];
					
					if (user.is_verified) {
						bcrypt.compare(password, user.password, (err, isMatch) => {
							if (err) {
								throw err;
							}

							if (isMatch) {
								return done(null, user);
							} else {
								return done(null, false, { message: "Password is incorrect" });
							}
						});
					} else {
						return done(null, false, { message: "This email is not verified" });
					}
				} else {
					return done(null, false, { message: "This email is not registered" });
				}

			}
		);
	};

	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			authenticateUser
		)
	);

	passport.serializeUser((/** @type {any} */  user, /** @type {any} */ done) => done(null, user.id));

	passport.deserializeUser((/** @type {number} */ id, /** @type {any} */ done) => {
		pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
			if (err) {
				return done(err);
			}
			return done(null, results.rows[0]);
		});
	});
}

module.exports = initialize;
