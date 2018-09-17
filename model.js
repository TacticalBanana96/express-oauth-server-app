const mongoose = require('./db/mongoose');

const {Client} = require('./models/client');
const accessTokenModel = require('./models/accessToken');
const refreshTokenModel = require('./models/refreshToken');
const {AuthorizationCode} = require('./models/authorizationCode');
const userModel = require('./models/user');

function generateAccessToken(client, user , scope){}

function generateRefreshToken(client, user, scope){}

function generateAuthorizationCode(client, user, scope){

}

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

function saveToken(accessToken,refreshToken, client, user){}

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
