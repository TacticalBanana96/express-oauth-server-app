const mongoose = require('mongoose');

const AuthorizationCodeSchema  = new mongoose.Schema({
  code: {
    code:{type: String},
    expiresAt: {type: Date},
    redirectUri: {type: String}
  },
  clientId: {type: String},
  user: {
    id: {type: String},
    username: {type: String},
    password: {type: String}
  }
});

const AuthorizationCode = mongoose.model('authorizationCode', AuthorizationCodeSchema);

module.exports = {AuthorizationCode};
