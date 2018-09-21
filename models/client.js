const mongoose = require('mongoose');

const ClientSchema  = new mongoose.Schema({
  id: String,
  clientSecret: String,
  redirectUri: String,
  grants: [String]
});

const Client = mongoose.model('client', ClientSchema);

module.exports = {Client};
