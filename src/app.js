const path = require('node:path');
const express = require('express');

const server = require('./config/server');
const userRoutes = require('./routes/user.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', userRoutes);

server.listen(app);
