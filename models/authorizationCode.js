const mongoose = require('mongoose');

const AuthorizationCodeSchema  = new mongoose.Schema({
  //code: {
  code: String,
  expiresAt: Date,
  redirectUri: String,
  //},
  clientId: String,
  userId: String
  });

const AuthorizationCode = mongoose.model('authorizationCode', AuthorizationCodeSchema);

module.exports = {AuthorizationCode};
