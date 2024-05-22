async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		const defaultChapter = req.query.chapter || 1;

		const bookTitleOptions = `SELECT DISTINCT book, book_order FROM englishbible ORDER BY book_order;`;
		const bookChapters = `SELECT DISTINCT chapter_number FROM englishbible WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM englishbible WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

		const isAuth = req.isAuthenticated();

		if (isAuth) {
			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);
			res.render("../public/views/scripture", {
				loggedIn: true,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		} else {
			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);
			res.render("../public/views/scripture", {
				loggedIn: false,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		}
	});

	app.post("/is_red", async (req, res) => {
		try {
			// First, check the current state of is_red
			const result = await pool.query(
				"SELECT DISTINCT is_red FROM englishbible"
			);
			const isCurrentlyRed = result.rows.some((row) => row.is_red);

			// Determine the new state to set
			const newState = isCurrentlyRed ? false : true;
			await client.query("UPDATE englishbible SET is_red = $1", [newState]);

			res.json({ success: true, newState });
		} catch (err) {
			console.error(err);
			res.status(500).json({ success: false, error: err.message });
		}
	});
}

module.exports = { bibleQuery };
