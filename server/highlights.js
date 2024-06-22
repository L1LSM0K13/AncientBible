async function highlightVerse(app, pool) {
	app.post("/users/bible", async (req, res) => {
		const user_id = req.user.id;
		let { verse_id, fathers_id } = req.body;

			try {
				const results = await pool.query(
					`INSERT INTO user_highlights (user_id, verse_id, fathers_id) VALUES ($1, $2, $3) RETURNING id, user_id, verse_id, fathers_id`,
					[user_id, verse_id, fathers_id]
				);

				console.table(results.rows);
				res.redirect("/users/bible");
			} catch (err) {
				console.log(err, "Server Error");
				res.status(500).send("Could not send request");
			}
	});
}

module.exports = { highlightVerse };
