const model = require('./../model');
const {Client} = require('./../models/client')
const {client, populateClients, authorizationCodes, populateAuthorizationCodes} = require('./seed/seed');

beforeEach(populateClients);
beforeEach(populateAuthorizationCodes);


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
    console.log('test running');
    model.getAuthorizationCode(authorizationCodes[1].code.code).then((authCode) => {
      console.log('AuthorizationCode', authCode);
      expect(typeof authCode).toBe('object');
      // expect(authCode).toBe(authorizationCodes[1].code.code);
      done();
    });
  });
});
