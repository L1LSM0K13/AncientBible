async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const user_id = req.user.id;
		let { noteText, verse_id, fathers_id } = req.body;

		const result = await pool.query(
			`INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
			[noteText, user_id, verse_id, fathers_id]
		);
		console.table(result.rows);

		await defaultRender(req, res, true, "../public/views/scripture", {});
	});
}

module.exports = { takeNote };
