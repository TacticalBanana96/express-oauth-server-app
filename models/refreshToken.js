const mongoose = require('mongoose');

const RefreshTokenSchema  = new mongoose.Schema({
  refreshToken: String,
  refreshTokenExpiresAt: String,
  clientId: String,
  user: {
    id: String,
    username: String,
    password: String
  }
});

const refreshTokenInstance = mongoose.model('refreshToken', RefreshTokenSchema);

module.exports = {refreshTokenInstance};
