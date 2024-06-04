async function takeNote(app, pool) {
	app.get("/users/bible", (req, res) => {
		res.render("../public/views/scripture", { errors: [] });
	});

	app.post("/users/bible", async (req, res) => {
		let { noteText } = req.body;
		let errors = [];

		if (!noteText) {
			errors.push({ message: "Note cannot be blank." });
		}

		if (errors.length > 0) {
			res.render("../public/views/scripture", { errors });
		} else {
			const result = await pool.query(
				`INSERT INTO notes (text)
				VALUES ($1)
				RETURNING id, text`,
				[noteText]
			);
			console.table([result.rows]);
			res.render("../public/views/scripture", { errors });
		}
	});
}

module.exports = { takeNote };
