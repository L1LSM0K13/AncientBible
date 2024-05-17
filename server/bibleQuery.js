async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		const defaultChapter = req.query.chapter || 1;

		const bookTitleOptions = `SELECT DISTINCT book, book_order FROM englishbible ORDER BY book_order;`;
		const bookChapters = `SELECT DISTINCT chapter_number FROM englishbible WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM englishbible WHERE book = $1 AND chapter_number = $2`;

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
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);

			res.render("../public/views/scripture", {
				loggedIn: false,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		}
	});
}

module.exports = { bibleQuery };
