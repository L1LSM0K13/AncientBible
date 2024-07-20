// Imports
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const session = require('express-session');
const flash = require('express-flash');

require('dotenv').config({ path: './config/.env' });

const passport = require('passport');
const initializePassport = require('./config/passportConfig');

// Routes
const userRoutes = require('./src/routes/users.route');
const homeRoutes = require('./src/routes/home.route');
const bibleRoutes = require('./src/routes/bible.route');
const fathersRoutes = require('./src/routes/fathers.route');
const noteRoutes = require('./src/routes/notes.route');
const highlightRoutes = require('./src/routes/highlights.route');



initializePassport(passport);

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
});

app.use('/users', userRoutes);
app.use('/users', bibleRoutes);
app.use('/users', fathersRoutes);
app.use('/users', noteRoutes);
app.use('/users', highlightRoutes);
app.use('/', homeRoutes);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
