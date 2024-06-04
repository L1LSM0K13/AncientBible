async function takeNote(app, pool) {
	app.get("/notes", (req, res) => {
		res.render("../public/views/notesTest", { errors: [] });
	});

	app.post("/notes", async (req, res) => {
		let { noteText } = req.body;
		let errors = [];

		if (!noteText) {
			errors.push({ message: "Note cannot be blank." });
		}

		if (errors.length > 0) {
			res.render("index", { errors });
		} else {
			const result = await pool.query(
				`INSERT INTO notes (text)
				VALUES ($1)
				RETURNING id, text`,
				[noteText]
			);
			console.table([result.rows]);
			res.render("../public/views/notesTest", { errors });
		}
	});
}

module.exports = { takeNote };
