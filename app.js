const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');
const ExpressOAuthServer = require('express-oauth-server');
const {mongoose} = require('./db/mongoose');
//// TODO: CHANGE redirectUri TO redirectUris
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

// app.all('/oauth/token', (req, res) => {
// 	let request = new Request(req);
// 	let response = new Response(res);

// 	oauth.token(request, response)
// 	  .then((token) => {
// 			res.locals.oauth = {token};
// 			res.send(token);
// 	  }).catch((err) => {
// 			res.status(err.statusCode).send(err.message)
// 	    console.log(err);
// 	  });
// });


// app.post('/oauth/authorize', (req, res) => {
// 	let request = new Request(req);
// 	let response = new Response(res);

// 	oauth.authorize(request, response)
// 		.then(() => {
// 			res.send('WELCOME TO SECRET AREA');
// 		}).catch((err) => {
// 			res.send(err);
// 			console.log(err);
// 		});
// });

app.all('/oauth/authenticate', (req, res, next)=> {
	let request = new Request(req);
	let response = new Response(res);

	oauth.authenticate(request, response)
	.then((token) => {
		res.locals.oauth = {token};
		res.send(token);
		next();
	}).catch((err) => {
		res.status(401).send();
		console.log(err);
	});
});


app.post('/oauth/authorize', (req, res, next) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth.authorize(request, response)
	.then((code) => {
		res.locals.oauth = {code};
		res.send(code);
		next();
	}).catch((err) => {
		res.status(err.statusCode).send();
		res.send(err.message)
		console.log(err);
	});
});

app.post('/oauth/token', (req, res, next) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth.token(request, response)
	.then((token)=> {
		res.locals.oauth = {token};
		res.send(token)
		next();
	})
	.catch((err)=> {
		res.status(err.statusCode).send();
		console.log(err);
	});
});
// app.all('/oauth/token', (req, res) => {
// 	let request = new Request(req);
// 	let response = new Response(res);

// 	oauth.token(request, response)
// 	  .then((token) => {
// 			res.locals.oauth = {token};
// 			res.send(token);
// 	  }).catch((err) => {
// 			res.status(err.statusCode).send(err.message)
// 	    console.log(err);
// 	  });
// });


app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
});

module.exports = {app}
