// Express.js imports
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Session imports
const session = require('express-session');
const flash = require('express-flash');

// Dotenv
require('dotenv').config({ path: './config/.env' });

// Passport import
const passport = require('passport');
const initializePassport = require('./config/passportConfig');

// Routes
const userRoutes = require('./src/routes/loginAndRegister.route');
const homeRoutes = require('./src/routes/home.route');
const bibleRoutes = require('./src/routes/bible.route');
const fathersRoutes = require('./src/routes/fathers.route');
const noteRoutes = require('./src/routes/notes.route');
const highlightRoutes = require('./src/routes/highlights.route');
const verifyRoutes = require('./src/routes/token.route');
const accountRoutes = require('./src/routes/userSettings.route');
const passwordResetRoutes = require('./src/routes/passwordReset.route');

initializePassport(passport);

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(
	session({
		// @ts-ignore
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Path logging
app.use((req, res, next) => {
	const start = Date.now();
	const originalSend = res.send;

	res.send = function (body) {
		const duration = Date.now() - start;
		console.log(req.method, req.path, res.statusCode, `${duration}ms`);
		return originalSend.call(this, body);
	};
	next();
});

let visitors = 0
app.use((req, res, next) => {
	visitors++
	next()
})


app.use('/', homeRoutes);
app.use('/', verifyRoutes);
app.use('/users', userRoutes);
app.use('/users', bibleRoutes);
app.use('/users', fathersRoutes);
app.use('/users', noteRoutes);
app.use('/users', highlightRoutes);
app.use('/users', accountRoutes);
app.use('/users', passwordResetRoutes);


app.listen(PORT, () => {
	console.log(`It's live on http://localhost:${PORT}`);
});
