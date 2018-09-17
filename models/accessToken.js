const mongoose = require('mongoose');

const AccessTokenSchema  = new mongoose.Schema({
  accessToken: String,
  accessTokenexpiresAt: Date,
  clientId: String,
  userId: String
});

const AccessToken = mongoose.model('accessToken', AccessTokenSchema);

module.exports = {AccessToken};
