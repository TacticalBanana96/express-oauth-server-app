const mongoose = require('mongoose');

mongoose.model('OAuthTokens', new mongoose.Schema({
  accessToken: {type: String},
  accessTokenExpiresOn: {type: Date},
  client: {type: Object},
  clientId: {type: String},
  refreshToken: {type: String},
  refreshTokenExpresOn: {type: Date},
  user: {type: Object},
  userId: {type: String}
}));

mongoose.model('OAuthClients', new mongoose.Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array }
}));

mongoose.model('OAuthUsers', new mongoose.Schema({
  email: { type: String, default: '' },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  username: { type: String }
}));

let OAuthTokensModel = mongoose.model('OAuthTokens');
let OAuthClientsModel = mongoose.model('OAuthClients');
let OAuthUsersModel = mongoose.model('OAuthUsers');

const getClient = (clientId, clientSecret) => {
return OAuthClientsModel.findOne({ clientId, clientSecret}).lean(); //lean returns plain javascript objects not mongoose documents
};

const getRefreshToken = (refreshToken) => {
  return OAuthTokensModel.findOne({refreshToken}).lean();
};

const getUser = (username, password) => {
  return OAuthUsersModel.findOne({username , password});
};

const registerUserInDB = (username, password) => {
  return OAuthUsersModel
}

const saveToken = (token, client, user) => {
  var accessToken = new OAuthTokensModel({
    accessToken: token.accessToken,
    accessTokenExpiresOn: token.accessTokenExpiresOn,
    client : client,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresOn: token.refreshTokenExpiresOn,
    user : user,
    userId: user._id,
  });
  // Can't just chain `lean()` to `save()` as we did with `findOne()` elsewhere. Instead we use `Promise` to resolve the data.
  return new Promise((resolve,reject) =>{
    accessToken.save((err,data) =>{
      if( err ) reject( err );
      else resolve( data );
    }) ;
  }).then((saveResult)=> {
    // `saveResult` is mongoose wrapper object, not doc itself. Calling `toJSON()` returns the doc.
    saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;

    // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
    var data = new Object();
    for( var prop in saveResult ) data[prop] = saveResult[prop];

    // /oauth-server/lib/models/token-model.js complains if missing `client` and `user`. Creating missing properties.
    data.client = data.clientId;
    data.user = data.userId;

    return data;
  });
};
module.exports = {getClient, getRefreshToken, getUser, saveToken};
