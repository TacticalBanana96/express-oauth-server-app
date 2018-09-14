const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');

const {mongoose} = require('./db/mongoose');

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
});
