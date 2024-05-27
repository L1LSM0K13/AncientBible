/**
 * @param {{ get: (arg0: string, arg1: (req: any, res: any) => Promise<void>) => void; }} app
 * @param {{ query: (arg0: string, arg1: any[] | undefined) => any; }} pool
 */
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
					// @ts-ignore
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);
			res.render("../public/views/fathers", {
				loggedIn: true,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map(
					(/** @type {{ chapter_number: any; }} */ row) => row.chapter_number
				),
				bookTitleOptions: bookTitleOptionRes.rows.map(
					(/** @type {{ book: any; }} */ row) => row.book
				),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		} else {
			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
				await Promise.all([
					// @ts-ignore
					pool.query(bookTitleOptions),
					pool.query(bookChapters, [defaultBook]),
					pool.query(bookText, [defaultBook, defaultChapter]),
				]);
			res.render("../public/views/fathers", {
				loggedIn: false,
				bookText: bookTextRes.rows,
				bookChapters: bookChaptersRes.rows.map(
					(/** @type {{ chapter_number: any; }} */ row) => row.chapter_number
				),
				bookTitleOptions: bookTitleOptionRes.rows.map(
					(/** @type {{ book: any; }} */ row) => row.book
				),
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
			});
		}
	});
}

module.exports = { fathersQuery };
