const defaultRender = require("./defaultValues");
async function fathersQuery(app, pool) {
	app.get("/users/fathers", async (req, res) => {
		const defaultBook = req.query.book || "1 Clement";
		const defaultChapter = req.query.chapter || 1;

		const bookTitleOptions = `SELECT DISTINCT book FROM fathersandwritings ORDER BY book`;
		const bookChapters = `SELECT DISTINCT chapter_number FROM fathersandwritings WHERE book = $1 ORDER BY chapter_number`;
		const bookText = `SELECT * FROM fathersandwritings WHERE book = $1 AND chapter_number = $2 ORDER BY id`;

		const isAuth = req.isAuthenticated();

		if (isAuth) {
			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);
			await defaultRender(req, res, true, "../public/views/fathers", {
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
			await defaultRender(req, res, false, "../public/views/fathers", {
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map((row) => row.chapter_number),
				bookTitleOptions: bookTitleOptionRes.rows.map((row) => row.book),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		}
	});
}

module.exports = { fathersQuery };
