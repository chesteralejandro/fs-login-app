const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello From Express');
});

app.listen(3000, () => {
	console.log('✅ Success. Server is listening.');
});
