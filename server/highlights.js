async function highlightVerse(app, pool) {
	app.post("/users/bible/action/highlight", async (req, res) => {
		const user_id = req.user.id;
		let { hasHighlight, verse_id, fathers_id, highlight_color } = req.body;

		try {
			if (!hasHighlight) {
				// If there is no highlight, insert.
				const results = await pool.query(
					`INSERT INTO user_highlights (user_id, verse_id, fathers_id, highlight_color) VALUES ($1, $2, $3, $4) RETURNING id, user_id, verse_id, fathers_id, highlight_color`,
					[user_id, verse_id, fathers_id, highlight_color]
				);
				console.table(results.rows);
				res.redirect("/users/bible");
			} else {
				// If there is highlight, delete.
				console.log('DELETING...')

				const results = await pool.query(
					`DELETE FROM user_highlights WHERE (user_id, verse_id, highlight_color) = ($1, $2, $3) RETURNING id, user_id, verse_id, fathers_id, highlight_color`,
					[user_id, verse_id, hasHighlight]
				)
				console.log('Query:', `DELETE FROM user_highlights WHERE (user_id, verse_id, highlight_color) = ($1, $2, $3) RETURNING id, user_id, verse_id, fathers_id, highlight_color`);
				console.log('Values:', [user_id, verse_id, hasHighlight]);

				console.table(results.rows);
				res.redirect("/users/bible");
			}

		} catch (err) {
			console.error(err);
			res.status(500).send("Could not send request");
		}
	});
}

module.exports = { highlightVerse };
