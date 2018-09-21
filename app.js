const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');
const ExpressOAuthServer = require('express-oauth-server');
const {mongoose} = require('./db/mongoose');

const port = 3000;

const app = express();
const Request = oauthserver.Request;
const Response = oauthserver.Response;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const oauth = new oauthserver({
	model: require('./model.js'),
	grants: ['authorization_code'],
	debug: true
});

app.get('/', (req, res) => {
		res.send('Hallo');
});

// oauth.authenticate(request, response, options)
//       .then((token) => {
//         res.locals.oauth = {token: token};
//         next();
//       }).catch((err) => {
//         // handle error condition
//         console.log(err);
//       });

app.post('/oauth/token', (req, res) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth.token(request, response)
	  .then((code) => {
	    res.locals.oauth = {token};
	  }).catch((err) => {
			res.status(err.statusCode).send(err.message)
	    console.log(err);
	  });
});

app.get('/oauth/authorize', (req, res) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth.authorize(request, response)
  .then((code) => {
    res.locals.oauth = {code: code};
  }).catch((err) => {
		res.status(err.statusCode).send(err.message)
    console.log(err);
  });
});

app.post('/oauth/authorize', (req, res) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth.authorize(request, response)
		.then((code) => {
			res.locals.oauth = {code: code};
		}).catch((err) => {
			res.send(err);
			//res.status(err.statusCode).send(err.message)
			console.log(err);
		});
});


app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
});

module.exports = {app}
