const mongoose = require('mongoose');

const RefreshTokenSchema  = new mongoose.Schema({
  refreshToken: String,
  expiresAt: Date,
  scope: String,
  clientId: String,
  userId: String
});

const RefreshToken = mongoose.model('refreshToken', RefreshTokenSchema);

module.exports = {RefreshToken};
