const mongoose = require('mongoose');

const ClientSchema  = new mongoose.Schema({
  clientId: String,
  clientSecret: String
});

const modelInstance = mongoose.model('client', ClientSchema);
