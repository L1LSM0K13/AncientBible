async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const defaultBook = req.query.book || "John";
		const defaultChapter = parseInt(req.query.chapter) || 1;

		const user_id = req.user ? req.user.id : null;

		const bookTitleOptionsQuery = `SELECT DISTINCT book, book_order FROM bible_eng ORDER BY book_order;`;
		const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM bible_eng WHERE book = $1 ORDER BY chapter_number`;
		const bookTextQuery = `SELECT * FROM bible_eng WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;
		const userNoteQuery = `SELECT * FROM user_notes WHERE user_id = $1 ORDER BY verse_id`;
		const userHighlightQuery = `SELECT * FROM user_highlights WHERE user_id = $1 ORDER BY verse_id`;

		const [
			bookTitleOptionRes,
			bookChaptersRes,
			bookTextRes,
			userNoteRes,
			userHighlightRes,
		] = await Promise.all([
			pool.query(bookTitleOptionsQuery),
			pool.query(bookChaptersQuery, [defaultBook]),
			pool.query(bookTextQuery, [defaultBook, defaultChapter]),
			pool.query(userNoteQuery, [user_id]),
			pool.query(userHighlightQuery, [user_id]),
		]);

		const bookTitles = bookTitleOptionRes.rows.map((row) => row.book);
		const chapters = bookChaptersRes.rows.map((row) => row.chapter_number);
		const bookText = bookTextRes.rows;

		const userNotes = userNoteRes.rows;
		const userHighlights = userHighlightRes.rows;


		let nextBook = defaultBook;
		let nextChapter = defaultChapter + 1;
		let previousBook = defaultBook;
		let previousChapter = defaultChapter - 1;

		// PAGINATION
		if (nextChapter > chapters.length) {
			const currentBookIndex = bookTitles.indexOf(defaultBook);
			nextBook = bookTitles[(currentBookIndex + 1) % bookTitles.length];
			const nextChapterRes = await pool.query(bookChaptersQuery, [nextBook]);
			nextChapter = nextChapterRes.rows[0].chapter_number;
		}
		if (previousChapter < 1) {
			const currentBookIndex = bookTitles.indexOf(defaultBook);
			previousBook =
				bookTitles[
					(currentBookIndex - 1 + bookTitles.length) % bookTitles.length
				];
			const previousChapterRes = await pool.query(bookChaptersQuery, [
				previousBook,
			]);
			previousChapter =
				previousChapterRes.rows[previousChapterRes.rows.length - 1]
					.chapter_number;
		}

		const isAuth = req.isAuthenticated();
		const renderData = {
			bookText: bookText,
			bookChapters: chapters,
			bookTitleOptions: bookTitles,
			selectedBook: defaultBook,
			selectedChapter: defaultChapter,
			nextBook: nextBook,
			nextChapter: nextChapter,
			previousBook: previousBook,
			previousChapter: previousChapter,
			userNotes: userNotes,
			userHighlights: userHighlights,
		};

		if (isAuth) {
			await defaultRender(
				req,
				res,
				true,
				"../public/views/scripture",
				renderData
			);
		} else {
			await defaultRender(
				req,
				res,
				false,
				"../public/views/scripture",
				renderData
			);
		}
		return renderData;
	});
}

module.exports = { bibleQuery };
