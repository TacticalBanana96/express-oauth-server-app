const mongoose = require('mongoose');

const RefreshTokenSchema  = new mongoose.Schema({
  refreshToken: {type: String},
  // refreshTokenExpiresAt: {type: Date},
  clientId: {type: String},
  userId: {type: String}
});

const RefreshToken = mongoose.model('refreshToken', RefreshTokenSchema);

module.exports = {RefreshToken};
