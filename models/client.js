const mongoose = require('mongoose');

const ClientSchema  = new mongoose.Schema({
  clientId: {type: String},
  clientSecret: {type: String},
  redirectUri: {type: String}
});

const Client = mongoose.model('client', ClientSchema);

module.exports = {Client};
