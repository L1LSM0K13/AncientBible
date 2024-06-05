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

module.exports = { renderedData };
