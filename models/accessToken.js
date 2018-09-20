const mongoose = require('mongoose');

const AccessTokenSchema  = new mongoose.Schema({
  accessToken: String,
  expiresAt: Date,
  scope: String,
  clientId: String,
  userId: String
});

const AccessToken = mongoose.model('accessToken', AccessTokenSchema);

module.exports = {AccessToken};
