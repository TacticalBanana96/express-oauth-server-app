const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');

const {mongoose} = require('./db/mongoose');

const port = 3000;

const app = express();
const Request = oauthserver.Request;
const Response = oauthserver.Response;

let request = new Request({});
let response = new Response({});
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.oauth = new oauthserver({
	model: require('./model.js')
});

// app.all('/oauth/token', app.oauth.token());
//
// app.all('/oauth/authorize', app.oauth.authorize(function(req, next) {
//
// // The first param should to indicate an error
//
// // The second param should a bool to indicate if the user did authorise the app
//
// // The third param should for the user/uid (only used for passing to saveAuthCode)
//
// next(null, true, '585273a465f7eb444462eb16', null);
//
// }));
app.get("/oauth/authorize", (req, res) => {
    // render an authorization form
});
// app.post("/oauth/authorize", app.oauth.authorize());
app.post("/oauth/token", app.oauth.token(request, response)
  .then((token) => {
    // The resource owner granted the access request.
  })
  .catch((err) => {
    // The request was invalid or not authorized.

  }));
//app.use(app.oauth.errorHandler());
app.use("/secure", app.oauth.authenticate());

app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
});
