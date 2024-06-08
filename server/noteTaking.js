async function takeNote(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");

		await defaultRender(req, res, true, "../public/views/scripture", {
			errors: [],
		});
	});

	app.post("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		let { noteText } = req.body;
		let errors = [];

		if (!noteText) {
			errors.push({ message: "Note cannot be blank." });
		}

		if (errors.length > 0) {
			await defaultRender(req, res, true, "../public/views/scripture", {});
		} else {
			const result = await pool.query(
				`INSERT INTO notes (text)
				VALUES ($1)
				RETURNING id, text`,
				[noteText]
			);
			console.table([result.rows]);
			await defaultRender(req, res, true, "../public/views/scripture", {});
		}
	});
}

module.exports = { takeNote };
