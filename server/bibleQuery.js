async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		const defaultChapter = req.query.chapter || 1;

		const bookTitleOptions = `SELECT DISTINCT book, book_order FROM bible_eng ORDER BY book_order;`;
		const bookChapters = `SELECT DISTINCT chapter_number FROM bible_eng WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM bible_eng WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

		const isAuth = req.isAuthenticated();
		let nextBook = defaultBook;
		let nextChapter = defaultChapter + 1;

		if (isAuth) {
			if (nextChapter > bookChapters[bookChapters.length - 1]) {
				const currentBookIndex = bookTitleOptions.indexOf(defaultBook);
				if (currentBookIndex < bookTitleOptions.length - 1) {
					nextBook = bookTitleOptions[currentBookIndex + 1];
					const nextBookChapterRes = await pool.query(bookChapters, [nextBook]);
					nextChapter = nextBookChapterRes.rows[0].chapter_number;
				} else {
					nextBook = bookTitleOptions[0];
					const nextBookChapterRes = await pool.query(bookChapters, [nextBook]);
					nextChapter = nextBookChapterRes.rows[0].chapter_number;
				}
			}

			const renderedData = {
				loggedIn: isAuth,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
				nextBook: nextBook,
				nextChapter: nextChapter,
			};

			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);
			res.render("../public/views/scripture", renderedData);
		} else {
			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);

			const renderedData = {
				loggedIn: isAuth,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
				nextBook: nextBook,
				nextChapter: nextChapter,
			};

			res.render("../public/views/scripture", renderedData);
		}
	});
}

module.exports = { bibleQuery };
