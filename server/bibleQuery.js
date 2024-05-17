async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		const defaultChapter = req.query.chapter || 1;

		const bookTitleOptions = `SELECT DISTINCT book FROM bible_verses ORDER BY book`;
		const bookChapters = `SELECT DISTINCT chapter_number FROM bible_verses WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM englishbible WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

		const isAuth = req.isAuthenticated();

		if (isAuth) {
			const [bookTitleOptionsRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [book]),
					pool.query(bookText, [book, chapter]),
				]);

			res.render("../public/views/scripture", {
				loggedIn: true,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
				selectedBook: book,
				selectedChapter: chapter,
			});
		} else {
			const [bookTitleOptionsRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [book]),
					pool.query(bookText, [book, chapter]),
				]);

			res.render("../public/views/scripture", {
				loggedIn: false,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
				selectedBook: book,
				selectedChapter: chapter,
			});
		}
	});
}

module.exports = { bibleQuery };

// async function bibleQuery(app, pool) {
// 	app.get("/users/bible", async (req, res) => {
// 		if (!req.isAuthenticated()) {
// 			await pool.query(
// 				`SELECT verse_number, is_red, verse_text FROM englishbible WHERE book = 'John'`,
// 				(err, results) => {
// 					res.render("../public/views/scripture.ejs", {
// 						bookText: results.rows,
// 						loggedIn: false,
// 					});
// 				}
// 			);
// 		}
// 	});
// }
