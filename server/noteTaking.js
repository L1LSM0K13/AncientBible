async function takeNote(app, pool) {
	app.post("/users/bible/action/note", async (req, res) => {
		const user_id = req.user.id;
		let { note_id, noteText, verse_id, fathers_id } = req.body;

		try {
			// Inserts note if there is note text
			if (noteText) {
				const results = await pool.query(
					`INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
					[noteText, user_id, verse_id, fathers_id]
				);

				console.table(results.rows);

				res.redirect("/users/bible");
				return;
			}

			if (note_id) {
				// Deletes not if there is a note id present
				const results = await pool.query(
					`DELETE FROM user_notes WHERE (id, user_id) = ($1, $2) RETURNING id, text, user_id, verse_id, fathers_id`,
					[note_id, user_id]
				);
				console.table(results.rows);

				res.redirect("/users/bible");
				return;
			}

			res.status(400).send("Neither noteText nor note_id were specified");
		} catch (err) {
			console.log(err);
			res.status(500).send("Could not send request");
		}
	});
}

module.exports = { takeNote };
