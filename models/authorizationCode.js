const mongoose = require('mongoose');

// const AuthorizationCodeSchema  = new mongoose.Schema({
//   code: {
//     code:{type: String},
//     expiresAt: {type: Date},
//     redirectUri: {type: String}
//   },
//   client: {
//     id: {type: String}
//   },
//   user: {
//     id: {type: String}
//   }
//   });

const AuthorizationCodeSchema  = new mongoose.Schema({
  code: {
    code:{type: String},
    expiresAt: {type: Date},
    redirectUri: {type: String}
  },
  clientId: {type: String},
  userId: {type: String}
  });

const AuthorizationCode = mongoose.model('authorizationCode', AuthorizationCodeSchema);

module.exports = {AuthorizationCode};
