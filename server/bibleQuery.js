async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		const defaultChapter = parseInt(req.query.chapter) || 1;

		let errors = [];

		const bookTitleOptionsQuery = `SELECT DISTINCT book, book_order FROM bible_eng ORDER BY book_order;`;
		const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM bible_eng WHERE book = $1 ORDER BY chapter_number`;
		const bookTextQuery = `SELECT * FROM bible_eng WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

		const isAuth = req.isAuthenticated();
		const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
			await Promise.all([
				pool.query(bookTitleOptionsQuery),
				pool.query(bookChaptersQuery, [defaultBook]),
				pool.query(bookTextQuery, [defaultBook, defaultChapter]),
			]);

		const bookTitles = bookTitleOptionRes.rows.map((row) => row.book);
		const chapters = bookChaptersRes.rows.map((row) => row.chapter_number);
		const bookText = bookTextRes.rows;

		let nextBook = defaultBook;
		let nextChapter = defaultChapter + 1;

		let previousBook = defaultBook;
		let previousChapter = defaultChapter - 1;

		if (nextChapter > chapters.length) {
			const currentBookIndex = bookTitles.indexOf(defaultBook);

			if (currentBookIndex < bookTitles.length - 1) {
				nextBook = bookTitles[currentBookIndex + 1];
				const nextChapterRes = await pool.query(bookChaptersQuery, [nextBook]);
				nextChapter = nextChapterRes.rows[0].chapter_number;
			} else {
				nextBook = bookTitles[0];
				const nextChapterRes = await pool.query(bookChaptersQuery, [nextBook]);
				nextChapter = nextChapterRes.rows[0].chapter_number;
			}
		}

		if (previousChapter < 1) {
			const currentBookIndex = bookTitles.indexOf(defaultBook);

			if (currentBookIndex > 0) {
				previousBook = bookTitles[currentBookIndex - 1];
			} else {
				previousBook = bookTitles[bookTitles.length - 1];
			}

			const previousChapterRes = await pool.query(bookChaptersQuery, [
				previousBook,
			]);
			previousChapter =
				previousChapterRes.rows[previousChapterRes.rows.length - 1]
					.chapter_number;
		}

		const renderedData = {
			loggedIn: isAuth,
			bookText: bookText,
			bookChapters: chapters,
			bookTitleOptions: bookTitles,
			selectedBook: defaultBook,
			selectedChapter: defaultChapter,
			nextBook: nextBook,
			nextChapter: nextChapter,
			previousBook: previousBook,
			previousChapter: previousChapter,
			errors: errors,
		};

		res.render("../public/views/scripture", renderedData);
	});
}
module.exports = { bibleQuery };
