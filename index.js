require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

let urls = [];

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function (req, res) {
	const url = req.body.url;
	if (!urls.includes(url)) {
		urls.push(url);
	}

	return res.json({
		orginalUrl: url,
		shortUrl: urls.indexOf(url),
	});
});

app.get('/api/shorturl/:short_url', function (req, res) {
	res.redirect(urls[req.params.short_url]);
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
