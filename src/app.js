const path = require('node:path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const server = require('./config/server');
const userRoutes = require('./routes/user.routes');
const flashMessages = require('./middleware/flashMessages');

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
app.use(flashMessages);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);

server.listen(app);
