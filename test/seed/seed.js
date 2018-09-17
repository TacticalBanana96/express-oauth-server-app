const mongoose = require('mongoose');

const {Client} = require('./../../models/client');

// const accessTokenModel = require('./../../models/accessToken');
// const refreshTokenModel = require('./../../models/refreshToken');
 const {AuthorizationCode} = require('./../../models/authorizationCode');
// const userModel = require('./../../models/user');


const client = [{
  clientId: '1',
  clientSecret: '123abc',
  redirectUri: 'www.app.com'
}, {
  clientId: '2',
  clientSecret: '456def',
  redirectUri: 'www.app2.com'
}];

const authorizationCodes = [{
  code: {
    code: 'sgdjhgdadhakhdadj39',
    expiresAt: new Date().getTime(),
    redirectUri: 'someapp.com/'
  },
  clientId: '1',
  user: {
    id: '123',
    username: 'Andrew',
    password: '123pass'
  }
}, {
  code: {
    code: 'fjhsfkshf893yrefhfrfh',
    expiresAt: new Date().getTime(),
    redirectUri: 'someapp2.com/'
  },
  clientId: '2',
  user: {
    id: '456',
    username: 'Jen',
    password: '456pass'
  }
}];

const populateClients = (done) => {
  Client.deleteMany({}).then(() => {
    let clientOne = new Client(client[0]).save();
    let clientTwo = new Client(client[1]).save();

    return Promise.all([clientOne, clientTwo]);
  }).then(() => done());
};

const populateAuthorizationCodes = (done) => {
  AuthorizationCode.deleteMany({}).then(()=> {
    let codeOne = new AuthorizationCode(authorizationCodes[0]).save();
    let codeTwo = new AuthorizationCode(authorizationCodes[1]).save();

    return Promise.all([codeOne, codeTwo]);
  }).then(() => done());
};

module.exports = {client, populateClients, authorizationCodes, populateAuthorizationCodes}
