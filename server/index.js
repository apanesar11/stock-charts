const express = require('express');
const next = require('next');
const cors = require('cors')
const routes = require('../routes');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

POLYGON_KEY = process.env.POLYGON_KEY;

const corsOptions = {
	origin: process.env.BACKEND_URL,
	optionsSuccessStatus: 200
}

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(bodyParser.json());

		server.get('/api/dailyaggs', cors(corsOptions), async (req, res) => {
			const {ticker} = req.query;
			const polygonRes = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2020-10-01/2020-12-25?unadjusted=true&sort=asc&limit=120&apiKey=${POLYGON_KEY}`)
			const data = await polygonRes.json();
			const formattedData = data.results.map(data => ({
        x: new Date(data.t),
        y: [data.o, data.h, data.l, data.c]
      }));
			return res.send({
				success: true,
				data: formattedData
			});
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		const PORT = process.env.PORT || 3000;
		server.use(handle).listen(PORT, (err) => {
			if (err) throw err;
			console.log('READY ON PORT:', PORT)
		});
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	});