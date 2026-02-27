const path = require('node:path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const server = require('./config/server');
const userRoutes = require('./routes/user.routes');

const app = express();
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionConfig));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success');
	res.locals.error_msg = req.flash('error');
	next();
});

app.use('/', userRoutes);

server.listen(app);
