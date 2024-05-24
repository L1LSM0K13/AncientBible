// async function bibleQuery(app, pool) {
// 	app.get("/users/bible", async (req, res) => {
// 		const defaultBook = req.query.book || "John";
// 		const defaultChapter = parseInt(req.query.chapter) || 1;

// 		const bookTitleOptionsQuery = `SELECT DISTINCT book, book_order FROM bible_eng ORDER BY book_order;`;
// 		const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM bible_eng WHERE book = $1 ORDER BY chapter_number`;
// 		const bookTextQuery = `SELECT * FROM bible_eng WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

// 		const isAuth = req.isAuthenticated();

// 		if (isAuth) {
// 			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
// 				await Promise.all([
// 					pool.query(bookTitleOptionsQuery),
// 					pool.query(bookChaptersQuery, [defaultBook]),
// 					pool.query(bookTextQuery, [defaultBook, defaultChapter]),
// 				]);

// 			const bookTitles = bookTitleOptionRes.rows.map((row) => row.book);
// 			const chapters = bookChaptersRes.rows.map((row) => row.chapter_number);
// 			const bookText = bookTextRes.rows;

// 			let nextBook = defaultBook;
// 			let nextChapter = defaultChapter + 1;

// 			if (nextChapter > chapters.length) {
// 				const currentBookIndex = bookTitleOptionsQuery.indexOf(defaultBook);

// 				if (currentBookIndex < bookTitles.length - 1) {
// 					nextBook = bookTitles[currentBookIndex + 1];
// 					const nextChapterRes = await pool.query(bookChaptersQuery, [
// 						nextBook,
// 					]);
// 					nextChapter = parseInt(nextChapterRes.rows[0].chapter_number);
// 				} else {
// 					nextBook = bookTitles[nextBook + 1];
// 					const nextChapterRes = await pool.query(bookChaptersQuery, [
// 						nextBook,
// 					]);
// 					nextChapter = parseInt(nextChapterRes.rows[0].chapter_number);
// 				}
// 			}

// 			const renderedData = {
// 				loggedIn: isAuth,
// 				bookText: bookText,
// 				bookChapters: chapters,
// 				bookTitleOptions: bookTitles,
// 				selectedBook: defaultBook,
// 				selectedChapter: defaultChapter,
// 				nextBook: nextBook,
// 				nextChapter: nextChapter,
// 			};

// 			res.render("../public/views/scripture", renderedData);
// 		} else {
// 			const [bookTitleOptionRes, bookChaptersRes, bookTextRes] =
// 				await Promise.all([
// 					pool.query(bookTitleOptionsQuery),
// 					pool.query(bookChaptersQuery, [defaultBook]),
// 					pool.query(bookTextQuery, [defaultBook, defaultChapter]),
// 				]);

// 			const bookTitles = bookTitleOptionRes.rows.map((row) => row.book);
// 			const chapters = bookChaptersRes.rows.map((row) => row.chapter_number);
// 			const bookText = bookTextRes.rows;

// 			let nextBook = defaultBook;
// 			let nextChapter = defaultChapter + 1;

// 			if (nextChapter > chapters.length) {
// 				const currentBookIndex = bookTitleOptionsQuery.indexOf(defaultBook);

// 				if (currentBookIndex < bookTitles.length - 1) {
// 					nextBook = bookTitles[currentBookIndex + 1];
// 					const nextChapterRes = await pool.query(bookChaptersQuery, [
// 						nextBook,
// 					]);
// 					nextChapter = parseInt(nextChapterRes.rows[0].chapter_number);
// 				} else {
// 					nextBook = bookTitles[0];
// 					const nextChapterRes = await pool.query(bookChaptersQuery, [
// 						nextBook,
// 					]);
// 					nextChapter = parseInt(nextChapterRes.rows[0].chapter_number);
// 				}
// 			}

// 			const renderedData = {
// 				loggedIn: isAuth,
// 				bookText: bookText,
// 				bookChapters: chapters,
// 				bookTitleOptions: bookTitles,
// 				selectedBook: defaultBook,
// 				selectedChapter: defaultChapter,
// 				nextBook: nextBook,
// 				nextChapter: nextChapter,
// 			};

// 			res.render("../public/views/scripture", renderedData);
// 		}
// 	});
// }

// module.exports = { bibleQuery };

async function bibleQuery(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const defaultBook = req.query.book || "John";
		const defaultChapter = parseInt(req.query.chapter) || 1;

		const bookTitleOptionsQuery = `SELECT DISTINCT book, book_order FROM bible_eng ORDER BY book_order;`;
		const bookChaptersQuery = `SELECT DISTINCT chapter_number FROM bible_eng WHERE book = $1 ORDER BY chapter_number`;
		const bookTextQuery = `SELECT * FROM bible_eng WHERE book = $1 AND chapter_number = $2 ORDER BY verse_number`;

		try {
			const isAuth = req.isAuthenticated();

			// Fetch the book titles and chapters for the selected book
			const [bookTitleOptionRes, bookChaptersRes] = await Promise.all([
				pool.query(bookTitleOptionsQuery),
				pool.query(bookChaptersQuery, [defaultBook]),
			]);

			const bookTitles = bookTitleOptionRes.rows.map((row) => row.book);
			const chapters = bookChaptersRes.rows.map((row) => row.chapter_number);

			let nextBook = defaultBook;
			let nextChapter = defaultChapter + 1;

			// Determine the next chapter and book
			if (nextChapter > chapters.length) {
				const currentBookIndex = bookTitles.indexOf(defaultBook);

				if (currentBookIndex < bookTitles.length - 1) {
					nextBook = bookTitles[currentBookIndex + 1];
					const nextChapterRes = await pool.query(bookChaptersQuery, [
						nextBook,
					]);
					nextChapter = nextChapterRes.rows[0].chapter_number;
				} else {
					// Loop back to the first book if the last book is reached
					nextBook = bookTitles[0];
					const nextChapterRes = await pool.query(bookChaptersQuery, [
						nextBook,
					]);
					nextChapter = nextChapterRes.rows[0].chapter_number;
				}
			}

			// Fetch the text for the selected chapter
			const bookTextRes = await pool.query(bookTextQuery, [
				defaultBook,
				defaultChapter,
			]);
			const bookText = bookTextRes.rows;

			const renderedData = {
				loggedIn: false,
				bookText: bookText,
				bookChapters: chapters,
				bookTitleOptions: bookTitles,
				selectedBook: defaultBook,
				selectedChapter: defaultChapter,
				nextBook: nextBook,
				nextChapter: nextChapter,
			};

			res.render("../public/views/scripture", renderedData);
		} catch (error) {
			console.error("Error executing query", error.stack);
			res.status(500).send("Something went wrong");
		}
	});
}

module.exports = { bibleQuery };
