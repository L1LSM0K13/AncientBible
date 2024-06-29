async function fathersQuery(app, pool) {
	app.get(`/users/fathers`, async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const defaultBook = req.query.book || "1 Clement";
		const defaultChapter = parseInt(req.query.chapter) || 1;

		const user_id = req.user ? req.user.id : null;

		const bookTitleOptionsQuery = `SELECT DISTINCT book FROM fathersandwritings ORDER BY book`;
		const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM fathersandwritings WHERE book = $1 ORDER BY chapter_number`;
		const bookTextQuery = `SELECT * FROM fathersandwritings WHERE book = $1 AND chapter_number = $2 ORDER BY id`;
		const userNoteQuery = `SELECT * FROM user_notes WHERE user_id = $1 ORDER BY fathers_id`;
		const userHighlightQuery = `SELECT * FROM user_highlights WHERE user_id = $1 ORDER BY fathers_id`;

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

		const userNotesFathers = userNoteRes.rows;
		const userHighlightsFathers = userHighlightRes.rows;


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
			userNotesFathers: userNotesFathers,
			userHighlightsFathers: userHighlightsFathers,
			isAuth: isAuth
		};

		res.cookie('selectedBook', defaultBook, {maxAge: 900000, httpOnly: true});
		res.cookie('selectedChapter', defaultChapter, {maxAge: 900000, httpOnly: true});

		if (isAuth) {
			await defaultRender(
				req,
				res,
				true,
				"../public/views/fathers",
				renderData
			);
		} else {
			await defaultRender(
				req,
				res,
				false,
				"../public/views/fathers",
				renderData
			);

		}
		return renderData;
	});
}

module.exports = { fathersQuery };
