const bookChapters = `SELECT chapter_number FROM englishbible WHERE (book, verse_number) = ($1, 1)`;
const bookTitleOptions = `SELECT book FROM englishbible WHERE (chapter_number, verse_number) = (1,1)`;
const bookText = `SELECT * FROM englishbible WHERE (book, chapter_number) = ('John', 1)`;

const loggedIn = req.isAuthenticated();

async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		if (loggedIn) {
			await pool.query(bookText, (err, results) => {
				if (err) {
					return console.error("Error running query", err);
				}
				res.render("../public/views/scripture", {
					books: results.rows,
					loggedIn: true,
				});
			});
		} else {
			await pool.query(bookText, (err, results) => {
				if (err) {
					return console.error("Error running query", err);
				}
				res.render("../public/views/scripture", {
					books: results.rows,
					loggedIn: false,
				});
			});

			// await pool.query(bookChapters, (err, results) => {
			// 	if (err) {
			// 		return console.error("Error running query", err);
			// 	}
			// 	res.render("../public/views/scripture", {
			// 		bookTitles: results.rows,
			// 		loggedIn: false,
			// 	});
			// });

			// const { rows } = await pool.query(bookTitleOptions);
			// const bookTitles = rows.map((row) => row.book);
			// res.render("../public/views/scripture", {
			// 	bookTitles: bookTitles,
			// 	loggedIn: false,
			// });
		}
	});
}

module.exports = { bibleQuery };
