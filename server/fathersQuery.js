async function fathersQuery(app, pool) {
	app.get("/users/fathers", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const defaultBook = req.query.book || "1 Clement";
		const defaultChapter = req.query.chapter || 1;

		const bookTitleOptions = `SELECT DISTINCT book FROM fathersandwritings ORDER BY book`;
		const bookChapters = `SELECT DISTINCT chapter_number FROM fathersandwritings WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM fathersandwritings WHERE book = $1 AND chapter_number = $2 ORDER BY id`;

		const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
			await Promise.all([
				pool.query(bookTitleOptions),
				pool.query(bookChapters, [defaultBook]),
				pool.query(bookText, [defaultBook, defaultChapter]),
			]);

		const isAuth = req.isAuthenticated();
		const renderData = {
			bookText: bookTextRes.rows,
			bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
			bookTitleOptions: bookTitleOptionRes.rows.map((row) => row.book),
			selectedBook: defaultBook,
			selectedChapter: defaultChapter,
		};
		if (isAuth) {
			await defaultRender(res, true, "../public/views/fathers", renderData);
		} else {
			await defaultRender(res, false, "../public/views/fathers", renderData);
		}
	});
}

module.exports = { fathersQuery };
