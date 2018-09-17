const mongoose = require('mongoose');

const AccessTokenSchema  = new mongoose.Schema({
  accessToken: String,
  accessTokenexpiresAt: Date,
  clientId: String,
  user: {
    id: String,
    username: String,
    password: String
  }
});

const accessTokenInstance = mongoose.model('accessToken', AccessTokenSchema);

module.exports = {accessTokenInstance};
