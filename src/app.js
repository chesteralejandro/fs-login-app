const express = require('express');

const server = require('./config/server');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use('/', userRoutes);

server.listen(app);
