const express = require('express');
const bodyParse = require('body-parser');
const OAuthServer = require('express-oauth-server');
const hbs = require('hbs');

const port = 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.oauth = new OAuthServer({ debug: true,  model: require('./models/model')});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(app.oauth.authorize());

app.post('/oauth/token', app.oauth.token());

app.get('oauth/authorize', (req, res) => {

});

app.get('/login', (req,res) => {
  res.render('login.hbs');
});

app.listen(port, ()=> {
  console.log();
});
