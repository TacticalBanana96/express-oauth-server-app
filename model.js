const mongoose = require('./db/mongoose');
const {Client} = require('./models/client');
const {AccessToken} = require('./models/accessToken');
const {RefreshToken} = require('./models/refreshToken');
const {AuthorizationCode} = require('./models/authorizationCode');
const {User} = require('./models/user');

const jwt = require('jsonwebtoken');

const secretKey = '123abc';



function generateAccessToken(client, user , scope){
  let token = jwt.sign({user: user.id, scope}, secretKey, {expiresIn: 3600, subject: client.id});
  return token;
}

function generateRefreshToken(client, user, scope){
  let token = jwt.sign({user: user.id, scope}, secretKey, {subject: client.id});
  return token;
}

function generateAuthorizationCode(client, user, scope){
  let code = jwt.sign({user: user.id, scope}, secretKey, {expiresIn: 3600, subject: client.id});
  return code;
}

async function getAuthorizationCode(authorizationCode){

let code = await AuthorizationCode.findOne({code: authorizationCode});
  if(!code){
      return Promise.reject('AuthorizationCode not found');
    }
  let client = await Client.findOne({id: code.clientId});
  let user = await User.findOne({id: code.userId});
  return Promise.resolve({
    code: code.code,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    client: {id: client.id},
    user: {id: user.id},
  });
}

async function getClient(id, clientSecret){
  let secret = clientSecret || secretKey;
  let client = await Client.findOne({id, clientSecret: secret});
  console.log('CLIENT', client);
    if(!client){
      return Promise.reject('Client not Found');
    }
    return Promise.resolve({
      id: client.id,
      redirectUri: client.redirectUri,
      grants: client.grants
    });
}


async function saveToken(token, client, user){
  let accessToken = new AccessToken({
    accessToken: token.accessToken,
    expiresAt: token.accessTokenExpiresAt,
    scope: token.scope,
    clientId: client.id,
    userId: user.id
  });
  let refreshToken = new RefreshToken({
    refreshToken: token.refreshToken,
    expiresAt: token.refreshTokenExpiresAt,
    scope: token.scope,
    clientId: client.id,
    userId: user.id
  });
  await accessToken.save();
  await refreshToken.save();

  return Promise.resolve({
    accessToken: accessToken.accessToken,
    accessTokenExpiresAt: accessToken.expiresAt,
    refreshToken: refreshToken.refreshToken,
    refreshTokenExpiresAt: refreshToken.expiresAt,
    scope: accessToken.scope,
    client: {id: accessToken.clientId},
    user: {id: accessToken.userId}
  });
}

async function getAccessToken(accessToken){
 let token = await AccessToken.findOne({accessToken});
  if(!token){
    return Promise.reject('Token not found');
  }

  let client = await Client.findOne({id: token.clientId});
  let user = await User.findOne({id: token.userId});

  return Promise.resolve({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.expiresAt,
    scope: token.scope,
    client: client,
    user: user
  });
}

async function saveAuthorizationCode(code, client, user){
  let authCode = new AuthorizationCode({
    code,
    expiresAt: new Date(2018,9,20),
    redirectUri: client.redirectUri,
    clientId: client.id,
    userId: user.id
  });

  return await authCode.save().then((authCode) => {
    return {
        code: authCode.code,
        expiresAt: authCode.expiresAt,
        redirectUri: authCode.redirectUri,
        client: {id: authCode.clientId},
        user: {id: authCode.userId}
      };
  });
}

async function revokeAuthorizationCode(code){
  await getAuthorizationCode(code);
  let authzDeleted =  await AuthorizationCode.findOneAndDelete({code});
  if(!authzDeleted){
    return Promise.reject('AuthorizationCode to be deleted not found');
  }

  return Promise.resolve(authzDeleted);
}

//function validateScope(user, client, scope){}


module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode,
  getAuthorizationCode,
  getClient,
  getAccessToken,
  saveToken,
  saveAuthorizationCode,
  revokeAuthorizationCode
  //validateScope,
};
