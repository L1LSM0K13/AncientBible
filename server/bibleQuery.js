// async function bibleQuery(app, pool) {
// 	app.get("/users/bible", async (req, res) => {
// 		const bookText = `SELECT * FROM englishbible WHERE (book, chapter_number) = ($1, 1)`;
// 		const bookChapters = `SELECT chapter_number FROM englishbible WHERE (book, verse_number) = ($1, 1)`;
// 		const bookTitleOptions = `SELECT book FROM englishbible WHERE (chapter_number, verse_number) = (1,1)`;

// 		const isAuth = req.isAuthenticated();

// 		if (isAuth) {
// 			const [bookTitleOptionsRes, bookChaptersRes, bookTextRes] =
// 				await Promise.all([
// 					pool.query(bookTitleOptions),
// 					pool.query(bookChapters),
// 					pool.query(bookText),
// 				]);

// 			res.render("../public/views/scripture", {
// 				bookText: bookTextRes.rows,
// 				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
// 				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
// 				loggedIn: true,
// 			});
// 		} else {
// 			const [bookTitleOptionsRes, bookChaptersRes, bookTextRes] =
// 				await Promise.all([
// 					pool.query(bookTitleOptions),
// 					pool.query(bookChapters),
// 					pool.query(bookText),
// 				]);

// 			res.render("../public/views/scripture", {
// 				bookText: bookTextRes.rows,
// 				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
// 				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
// 				loggedIn: false,
// 			});
// 		}
// 	});
// }

async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		if (!req.isAuthenticated()) {
			await pool.query(
				`SELECT verse_number, is_red, verse_text FROM englishbible WHERE book = 'John'`,
				(err, results) => {
					res.render("../public/views/scripture.ejs", {
						bookText: results.rows,
						isRed: bookText.is_red,
						loggedIn: false,
					});
				}
			);
		}
	});
}

module.exports = { bibleQuery };
