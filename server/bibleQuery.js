async function bibleQuery(app, pool) {
	app.get("/users/bible", (req, res) => {
		if (req.isAuthenticated()) {
			pool.query(
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
			// pool.query(
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

			pool.query(
				`SELECT book FROM englishbible WHERE (chapter_number, verse_number) = (1,1)`,
				(err, results) => {
					if (err) {
						return console.error("Error running query", err);
					}
					res.render("../public/views/scripture", {
						bookTitles: results.rows,
						loggedIn: false,
					});
				}
			);
		}
	});
}

module.exports = { bibleQuery };
