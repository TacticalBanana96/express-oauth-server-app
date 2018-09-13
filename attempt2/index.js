const port = 3000;

const bearerTokensDBHelper = require('./dbHelpers/bearerTokensDBHelper'); //handles saving and retreiving oauth bearer tokens
const userDBHelper = require('./dbHelpers/userDBHelper');//handles registering and retrieving users

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
