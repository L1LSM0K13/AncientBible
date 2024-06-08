async function takeNote(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const { bibleQuery } = require("./bibleQuery");
		await defaultRender(
			req,
			res,
			true,
			"../public/views/scripture",
			bibleQuery(app, pool)
		);
	});

	app.post("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const { bibleQuery } = require("./bibleQuery");
		let { noteText } = req.body;

		const result = await pool.query(
			`INSERT INTO notes (text)
				VALUES ($1)
				RETURNING id, text`,
			[noteText]
		);
		console.table([result.rows]);
		await defaultRender(
			req,
			res,
			true,
			"../public/views/scripture",
			bibleQuery(app, pool)
		);
	});
}

module.exports = { takeNote };
