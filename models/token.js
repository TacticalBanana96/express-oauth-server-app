const mongoose = require('mongoose');

const TokeSchema  = new mongoose.Schema({
  accessToken: String,
  expires: Date,
  clientId: String,
  user: {

  }
});

const modelInstance = mongoose.model('client', ClientSchema);
