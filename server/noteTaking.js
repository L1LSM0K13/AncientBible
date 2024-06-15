async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { noteText, verse_id, fathers_id } = req.body;

		try {
			const result = await pool.query(
				`INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
				[noteText, user_id, verse_id, fathers_id]
			);

			const user_notes = result.rows;
			console.table(user_notes);

			res.redirect("/users/bible");
		} catch (err) {
			console.log(err);
			res.status(500).send("server error");
		}
	});
}

module.exports = { takeNote };
