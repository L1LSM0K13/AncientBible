async function takeNote(app, pool) {
	var bookText = bookText;
	var bookChapters = chapters;
	var bookTitleOptions = bookTitles;
	var selectedBook = defaultBook;
	var selectedChapter = defaultChapter;
	var nextBook = nextBook;
	var nextChapter = nextChapter;
	var previousBook = previousBook;
	var previousChapter = previousChapter;

	app.get("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		await defaultRender(req, res, true, "../public/views/scripture", {
			bookText,
			bookChapters,
			bookTitleOptions,
			selectedBook,
			selectedChapter,
			nextBook,
			nextChapter,
			previousBook,
			previousChapter,
		});
	});

	app.post("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		let { noteText } = req.body;
		let errors = [];

		if (!noteText) {
			errors.push({ message: "Note cannot be blank." });
		}

		if (errors.length > 0) {
			await defaultRender(req, res, true, "../public/views/scripture", {
				bookText,
				bookChapters,
				bookTitleOptions,
				selectedBook,
				selectedChapter,
				nextBook,
				nextChapter,
				previousBook,
				previousChapter,
			});
		} else {
			const result = await pool.query(
				`INSERT INTO notes (text)
				VALUES ($1)
				RETURNING id, text`,
				[noteText]
			);
			console.table([result.rows]);
			await defaultRender(req, res, true, "../public/views/scripture", {
				bookText,
				bookChapters,
				bookTitleOptions,
				selectedBook,
				selectedChapter,
				nextBook,
				nextChapter,
				previousBook,
				previousChapter,
			});
		}
	});
}

module.exports = { takeNote };
