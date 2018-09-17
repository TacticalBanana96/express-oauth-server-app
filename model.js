const mongoose = require('./db/mongoose');
const {Client} = require('./models/client');
// const {AccessToken} = require('./models/accessToken');
// const {RefreshToken} = require('./models/refreshToken');
const {Token} = require('./models/token');
const {AuthorizationCode} = require('./models/authorizationCode');
const {User} = require('./models/user');

const jwt = require('jsonwebtoken');

const secretKey = 'Example secret key';



function generateAccessToken(client, user , scope){
  let token = jwt.sign({user: user.id, scope}, secretKey, {expiresIn: 3600, subject: client.clientId});

  return token;
}

function generateRefreshToken(client, user, scope){
  let token = jwt.sign({user: user.id, scope}, secretKey, {subject: client.clientId});

  return token;
}

function generateAuthorizationCode(client, user, scope){}

function getAuthorizationCode(authorizationCode){
  return AuthorizationCode.find({ "code.code": {"$eq": authorizationCode }}).then((code) => {
    if(!code){
      return Promise.reject();
    }
    return code;
  })
}

// async function getClient(clientId, clientSecret){
//   let client = await Client.findOne({clientId, clientSecret}).exec();
//
//   if(!client){
//     return Promise.reject();
//   }
//   return client;
// }
function getClient(clientId, clientSecret){
  return Client.findOne({clientId, clientSecret}).then((client) => {
    if(!client){
      return Promise.reject();
    }
    return client;
  });
}

function saveToken(accessToken,refreshToken, client, user){
  let token = new Token({
    accessToken,
    accessTokenExpiresAt: 3600,
    refreshToken,
    scope: 'READ',
    clientId: client.clientId,
    userId: user.id
  });

  token.save().then(() => token);
}

function saveAuthorizationCode(code, client, user){}

function revokeAuthorizationCode(code){}

function validateScope(user, client, scope){}


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode,
  getAuthorizationCode,
  getClient,
  saveToken,
  saveAuthorizationCode,
  revokeAuthorizationCode,
  validateScope,
};
