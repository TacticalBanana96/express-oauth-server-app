const mongoose = require('mongoose');

const TokenSchema  = new mongoose.Schema({
  accessToken: {type: String},
  accessTokenExpiresAt: {type: String},
  refreshToken: {type: String},
  scope: {type: String},
  client: {
    id: {type: String}
  },
  user: {
    id: {type: String}
  }
});

const Token = mongoose.model('token', TokenSchema);

module.exports = {Token};
