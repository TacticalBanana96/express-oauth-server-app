const express = require('express');
const bodyParser = require('body-parser');
const OAuthServer = require('express-oauth-server');
const hbs = require('hbs');
const util = require('util');

const {mongoose} = require('./db/mongoose');

const port = 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.oauth = new OAuthServer({ model: require('./model')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.oauth.authorize());

app.post('/oauth/token', app.oauth.token());

app.get('oauth/authorize', (req, res) => {});

// Post authorization.
app.post('/oauth/authorize', (req, res)=> {});

app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
  console.log(Buffer.from('1' + ':' + '123abc').toString('base64'));
  console.log(Buffer.from("YXBwbGljYXRpb25zZWNyZXQ=", 'base64').toString('ascii'));
  console.log(Buffer.from("MToxMjNhYmM=", 'base64').toString('ascii'));

});
