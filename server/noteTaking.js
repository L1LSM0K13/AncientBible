async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { noteText, fathers_id } = req.body;

		try {
			const verse_id = await getVerseId();

			const result = await pool.query(
				`INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
				[noteText, user_id, verse_id, fathers_id]
			);
			console.table(result.rows);

			res.redirect("/users/bible");
		} catch (err) {
			console.log(err, "Could not run function");
		}
	});
}

module.exports = { takeNote };
