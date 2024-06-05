module.exports = function (req, res, next) {
	res.locals.loggedIn = req.isAuth; // assuming isAuth is attached to req in your authentication middleware
	res.locals.bookText = req.bookText; // assuming bookText is attached to req somewhere in your app
	res.locals.bookChapters = req.chapters;
	res.locals.bookTitleOptions = req.bookTitles;
	res.locals.selectedBook = req.defaultBook;
	res.locals.selectedChapter = req.defaultChapter;
	res.locals.nextBook = req.nextBook;
	res.locals.nextChapter = req.nextChapter;
	res.locals.previousBook = req.previousBook;
	res.locals.previousChapter = req.previousChapter;
	res.locals.errors = req.errors;
	next();
};
