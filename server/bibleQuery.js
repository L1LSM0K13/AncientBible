async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const bookText = `SELECT * FROM englishbible WHERE (book, chapter_number) = ('John', 1)`;
		const bookChapters = `SELECT chapter_number FROM englishbible WHERE (book, verse_number) = ($1, 1)`;
		const bookTitleOptions = `SELECT book FROM englishbible WHERE (chapter_number, verse_number) = (1,1)`;

		const isAuth = req.isAuthenticated();

		if (isAuth) {
			const [bookTextRes, bookChaptersRes, bookTitleOptionsRes] =
				await Promise.all([
					pool.query(bookText),
					pool.query(bookChapters, ["John"]),
					pool.query(bookTitleOptions),
				]);

			res.render("../public/views/scripture", {
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row, chapter_number),
				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
				loggedIn: true,
			});
		} else {
			const [bookTextRes, bookChaptersRes, bookTitleOptionsRes] =
				await Promise.all([
					pool.query(bookText),
					pool.query(bookChapters, ["John"]),
					pool.query(bookTitleOptions),
				]);

			res.render("../public/views/scripture", {
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row, chapter_number),
				bookTitleOptions: bookTitleOptionsRes.rows.map((row) => row.book),
				loggedIn: false,
			});
		}
	});
}

module.exports = { bibleQuery };
