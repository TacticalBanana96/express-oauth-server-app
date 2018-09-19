const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');

const {mongoose} = require('./db/mongoose');

const port = 3000;

const app = express();
const Request = oauthserver.Request;
const Response = oauthserver.Response;

// let request = new Request({method: 'GET', });
// let response = new Response(res);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const oauth = new oauthserver({
	model: require('./model.js')
});

function tokenHandler(options) {
  return (req, res, next) =>{
    let request = new Request(req);
    let response = new Response(res);
    return oauth.token(request, response, options)
      .then((code) => {
        res.locals.oauth = {token};
        next();
      }).catch((err) => {
        //handle error
        console.log(err);
      });
  }
}

function authenticateHandler(options) {
  return (req, res, next) => {
    let request = new Request(req);
    let response = new Response(res);
    return oauth.authenticate(request, response, options)
      .then((token) => {
        res.locals.oauth = {token: token};
        next();
      }).catch((err) => {
        // handle error condition
        console.log(err);
      });
  }
}

function authorizeHandler(options) {
  return (req,res, next) => {
    let request = new Request(req);
    let response = new Response(res);
    return oauth.authorize(request, response, options)
      .then((code) => {
        res.locals.oauth = {code: code};
        next();
      }).catch((err) => {
        // handle error condition
        console.log(err);
      });
  }
}

app.post('/oauth/token', (req, res) => {
  oauth.token(req, res).then((token) => {
    console.log(token);
  }).catch((err) => {
    console.log(err);
  });
})

app.get('/oauth/authorize', (req, res) => {
  oauth.authorize(req, res).then((code) => {
    console.log(code);
  }).catch((err) => {
    console.log(err);
  });
})

app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
});
