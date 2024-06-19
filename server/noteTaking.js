async function takeNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { noteText, verse_id, fathers_id } = req.body;

		try {
			const results = await pool.query(
				`INSERT INTO user_notes (text, user_id, verse_id, fathers_id) VALUES ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
				[noteText, user_id, verse_id, fathers_id]
			);

			console.table(results.rows);

			res.redirect("/users/bible");
		} catch (err) {
			console.log(err);
			res.status(500).send("server error");
		}
	});
}

async function deleteNote(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { note_id, verse_id, fathers_id } = req.body;

		try {
			const results = await pool.query(
				`DELETE FROM user_notes WHERE (id, user_id, verse_id, fathers_id) = ($1, $2, $3, $4) RETURNING id, text, user_id, verse_id, fathers_id`,
				[note_id, user_id, verse_id, fathers_id]
			);
			console.table(results.rows);

			res.redirect("/users/bible");
		} catch (err) {
			console.log(err);
			res.status(500).send("Could not send request");
		}
	});
}

module.exports = { takeNote };
module.exports = { deleteNote };
