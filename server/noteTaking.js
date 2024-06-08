// async function takeNote(app, pool) {
// 	app.get("/users/bible", async (req, res) => {
// 		const { defaultRender } = require("./defaultValues");

// 		await defaultRender(req, res, true, "../public/views/scripture", {});
// 	});
// 	const { bibleQuery } = require("./bibleQuery");

// 	app.post("/users/bible", async (req, res) => {
// 		const { defaultRender } = require("./defaultValues");
// 		let { noteText } = req.body;
// 		let errors = [];

// 		if (!noteText) {
// 			errors.push({ message: "Note cannot be blank." });
// 		}

// 		if (errors.length > 0) {
// 			await defaultRender(req, res, true, "../public/views/scripture", {
// 				errors,
// 			});
// 		} else {
// 			const result = await pool.query(
// 				`INSERT INTO notes (text)
// 				VALUES ($1)
// 				RETURNING id, text`,
// 				[noteText]
// 			);
// 			console.table([result.rows]);
// 			try {
// 				await bibleQuery(app, pool);
// 			} catch (err) {
// 				console.log(err);
// 			}
// 			await defaultRender(req, res, true, "../public/views/scripture", {});
// 		}
// 	});
// }

async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		console.log("POST /users/bible");
		const { defaultRender } = require("./defaultValues");
		const { bibleQuery } = require("./bibleQuery");
		let { noteText } = req.body;
		let errors = [];

		if (!noteText) {
			errors.push({ message: "Note cannot be blank." });
		}

		if (errors.length > 0) {
			await defaultRender(req, res, true, "../public/views/scripture", {
				errors,
			});
		} else {
			try {
				const result = await pool.query(
					`INSERT INTO notes (text) VALUES ($1) RETURNING id, text`,
					[noteText]
				);
				console.table(result.rows);

				// Assuming bibleQuery is necessary and performs some critical action
				await bibleQuery(app, pool);

				// Render success response
				await defaultRender(req, res, true, "../public/views/scripture", {
					note: result.rows[0],
				});
			} catch (err) {
				console.error("Database error:", err);
				// Render error response
				await defaultRender(req, res, true, "../public/views/scripture", {
					errors: [{ message: "Database error." }],
				});
			}
		}
	});
}

module.exports = { takeNote };
