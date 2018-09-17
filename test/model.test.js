const model = require('./../model');
const {Client} = require('./../models/client')
const {client, populateClients, authorizationCodes, populateAuthorizationCodes,  users, populateUsers} = require('./seed/seed');

beforeEach(populateClients);
beforeEach(populateAuthorizationCodes);
//beforeEach(populateUsers);

describe('getClient', () => {
  test('Should return client when valid clientid and client clientSecret are passed', (done) => {
    model.getClient(client[0].clientId, client[0].clientSecret).then((clientRes) => {
      expect(typeof clientRes).toBe('object');
      expect(clientRes.clientId).toBe(client[0].clientId);
      expect(clientRes.clientSecret).toBe( client[0].clientSecret);
      done();
    });
  });

  test('Should not return client for incorrect parameters', (done) =>{
    model.getClient('jfhsd', 'dfgfs').then((client) => {
      expect(typeof client).toBe('undefined');
      done()
    }).catch((e) => {
      expect(typeof e).toBe('undefined');
      done();
    });
  });
});

describe('getAuthorizationCode', () => {
  test('Should return authorizationCode object when valid code is passed', (done) => {
    model.getAuthorizationCode(authorizationCodes[1].code.code).then((authCode) => {
      console.log('AuthorizationCode', authCode);
      expect(typeof authCode).toBe('object');
      // expect(authCode).toBe(authorizationCodes[1].code.code);
      done();
    });
  });

  test('Should not return an authorizationCode when invalid info is passed', (done) => {
    model.getAuthorizationCode('dsfhkjsdfgh7923rygu2hr9eyrduf').then((authCode) => {
      done();
    }).catch((e) => {
      expect(typeof e).toBe('undefined');
      done();
    });
  })
});

describe('generateAccessToken', () => {
  test('Should return an access token for the data passed', () => {
    token = model.generateAccessToken(client[0], users[0] , 'READ');
      console.log(token);
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
  });
});
