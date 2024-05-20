async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		let defaultChapter = req.query.chapter || 1;

		const bookTitleOptionsQuery = `SELECT DISTINCT book, book_order FROM englishbible ORDER BY book_order;`;
		const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM englishbible WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM englishbible WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

		const isAuth = req.isAuthenticated();

		if (isAuth) {
			const [bookTitleOptionsRes, bookChaptersRes] = await Promise.all([
				pool.query(bookTitleOptionsQuery),
				pool.query(bookChaptersQuery, [defaultBook]),
			]);
			const bookChapters = bookChaptersRes.rows.map(
				(row) => row.chapter_number
			);
			if (!req.query.chapter && bookChapters.length > 0) {
				defaultChapter = bookChapters[0];
			}
			const bookTextRes = pool.query(bookText, [defaultBook, defaultChapter]);

			res.render("../public/views/scripture", {
				loggedIn: true,
				bookText: bookTextRes.rows,
				bookChapters: bookChapters,
				bookTitleOptionsQuery: bookTitleOptionsRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		} else {
			const [bookTitleOptionsRes, bookChaptersRes] = await Promise.all([
				pool.query(bookTitleOptionsQuery),
				pool.query(bookChaptersQuery, [defaultBook]),
			]);
			const bookChapters = bookChaptersRes.rows.map(
				(row) => row.chapter_number
			);
			if (!req.query.chapter && bookChapters.length > 0) {
				defaultChapter = bookChapters[0];
			}
			const bookTextRes = pool.query(bookText, [defaultBook, defaultChapter]);

			res.render("../public/views/scripture", {
				loggedIn: false,
				bookText: bookTextRes.rows,
				bookChapters: bookChapters,
				bookTitleOptionsQuery: bookTitleOptionsRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		}
	});
}

module.exports = { bibleQuery };
