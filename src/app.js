const express = require('express');

const server = require('./config/server');

const app = express();

app.get('/', (req, res) => {
	res.send('Server is in another file.');
});

server.listen(app);
