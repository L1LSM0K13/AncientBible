async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		if (req.isAuthenticated()) {
			await pool.query(
				`SELECT * FROM englishbible WHERE (book, chapter_number) = ('John', 1)`,
				(err, results) => {
					if (err) {
						return console.error("Error running query", err);
					}
					res.render("../public/views/scripture", {
						books: results.rows,
						loggedIn: true,
					});
				}
			);
		} else {
			// await pool.query(
			// 	`SELECT * FROM englishbible WHERE (book, chapter_number) = ('John', 1)`,
			// 	(err, results) => {
			// 		if (err) {
			// 			return console.error("Error running query", err);
			// 		}
			// 		res.render("../public/views/scripture", {
			// 			books: results.rows,
			// 			loggedIn: false,
			// 		});
			// 	}
			// );

			const { rows } = await pool.query(
				`SELECT book FROM englishbible WHERE (chapter_number, verse_number) = (1,1)`,
				(err, results) => {
					if (err) {
						return console.error("Error running query", err);
					}
					const bookTitles = rows.map((row) => row.book);
					res.render("../public/views/scripture", {
						bookTitles: bookTitles,
						loggedIn: false,
					});
				}
			);

			// await pool.query(
			// 	`SELECT chapter_number FROM englishbible WHERE (book, verse_number) = ('Genesis', 1)`
			// ),
			// 	(err, results) => {
			// 		if (err) {
			// 			return console.error("Error running query", err);
			// 		}
			// 		res.render("../public/views/scripture.ejs", {
			// 			chapterNumbers: results.rows,
			// 			loggedIn: false,
			// 		});
			// 	};
		}
	});
}

module.exports = { bibleQuery };
