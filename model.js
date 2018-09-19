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

function generateAuthorizationCode(client, user, scope){
  let code = jwt.sign({user: user.id, scope}, secretKey, {expiresIn: 3600, subject: client.clientId});

   return code;
}

async function getAuthorizationCode(authorizationCode){
  return await AuthorizationCode.find({ "code.code": {"$eq": authorizationCode }}).then((code) => {
    if(!code || (code instanceof Array && code.length === 0)){
      return Promise.reject('AuthorizationCode not found');
    }
    return Promise.resolve(code);
  });
}

async function getClient(clientId, clientSecret){
  return await Client.findOne({clientId, clientSecret}).then((client) => {
    //if((!client) || (client.length < 1) || client.length === 0) {
    if(!client || (client instanceof Array && client.length === 0)){
      return Promise.reject('Client not Found');
    }
    return Promise.resolve(client);
  });
}


async function saveToken(accessToken,refreshToken, client, user){
  let token = new Token({
    accessToken,
    accessTokenExpiresAt: 3600,
    refreshToken,
    scope: 'READ',
    clientId: client.clientId,
    userId: user.id
  });

  return await token.save();
}

async function getAccessToken(accessToken){
 let token = await Token.findOne({accessToken});

  if(!token){
    return Promise.reject('Token not found');
  }
  return Promise.resolve(token);
}

async function saveAuthorizationCode(code, client, user){

  let authCode = new AuthorizationCode({
     code: {
      code,
      expiresAt: 3600,
      redirectUri: client.redirectUri
    },
    clientId: client.clientId,
    user: {
      id: user.id,
    }
  });

  return await authCode.save();
}

async function revokeAuthorizationCode(code){
  await getAuthorizationCode(code);
  let authzDeleted = await AuthorizationCode.findOneAndDelete({ "code.code": {"$eq": code }});
  if(!authzDeleted || (authzDeleted.length === 0)){
    return Promise.reject('AuthorizationCode to be deleted not found');
  }

  return Promise.resolve(authzDeleted);
}

function validateScope(user, client, scope){}


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode,
  getAuthorizationCode,
  getClient,
  getAccessToken,
  saveToken,
  saveAuthorizationCode,
  revokeAuthorizationCode,
  validateScope,
};
