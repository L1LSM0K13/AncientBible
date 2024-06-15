async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { noteText, verse_id, fathers_id } = req.body;

		const result = await pool.query(
			`INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
			[noteText, user_id, verse_id, fathers_id]
		);
		console.table(result.rows);

		const InsertedNote = result.rows[0];

		res.redirect("/users/bible");
	});
}

module.exports = { takeNote };
