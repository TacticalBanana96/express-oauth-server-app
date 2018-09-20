const model = require('./../model');
const {Client} = require('./../models/client')
const {client, populateClients, authorizationCodes, populateAuthorizationCodes,  users, populateUsers, clearTokens} = require('./seed/seed');
// const {client, authorizationCodes,  users} = require('./seed/seed');


const mongoose = require('mongoose');
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwic2NvcGUiOiJSRUFEIiwiaWF0IjoxNTM3MzEwMzc5LCJleHAiOjE1MzczMTM5NzksInN1YiI6IjEifQ.JInJ0i_twklKodOxv0Rwae1j-C7XnraE4ux-BAQgDm4';
const code = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwic2NvcGUiOiJSRUFEIiwiaWF0IjoxNTM3MzEyOTU5LCJleHAiOjE1MzczMTY1NTksInN1YiI6IjEifQ.qAbUxBD5GuZsnW4JVXAF-vBGXEtV-hJ51ySqmmq9dvk';
const refreshToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwic2NvcGUiOiJSRUFEIiwiaWF0IjoxNTM3MzEwNjQ0LCJleHAiOjE1MzczMTQyNDQsInN1YiI6IjEifQ.iRt50FDe7YSdzRy_f8RNV0aaxcQRZg8GjB6L2aMBPh8';

beforeEach(populateClients);
beforeEach(populateAuthorizationCodes);
beforeAll(clearTokens);
//beforeEach(populateUsers);
// afterAll(() => {
//  await  mongoose.connection.db.dropDatabase();
//  mongoose.connection.close();
// });

describe('getClient', () => {
  test('Should return client when valid parameters are passed', () => {
    return expect(model.getClient(client[0].id, client[0].clientSecret)).resolves.toBeTruthy();
  });

  test('Should return client with values matching the parameters passed', async() => {
    // let clientRes = await model.getClient(client[0].id, client[0].clientSecret);
    return expect(await model.getClient(client[0].id, client[0].clientSecret)).toEqual(expect.objectContaining({id: client[0].id, redirectUri: client[0].redirectUri}));
  });

  test('Should not return client for incorrect parameters', () =>{
    return expect(model.getClient('jfhsd', 'dfgfs')).rejects.toBeTruthy();
  });

  test('Should not return client for empty parameters',  () => {
    return expect( model.getClient('','')).rejects.toBeTruthy();
  });
});

describe('getAuthorizationCode', () => {
  test('Should return authorizationCode object when valid code is passed', () => {
    return expect( model.getAuthorizationCode(authorizationCodes[1].code.code)).resolves.toBeTruthy();
  });

  test('Should return authorizationCode with parameters matching the ones passed', async () => {
    let authCode = authorizationCodes[1].code.code;
    let res = await model.getAuthorizationCode(authCode);
  return  expect(res.code).toEqual(authorizationCodes[1].code.code);

  });
  test('ExpiresAt should be type Date', async () => {
    let authCode = authorizationCodes[1].code.code;
    let res = await model.getAuthorizationCode(authCode);
    return expect(res.expiresAt instanceof Date).toBe(true);
  });

  test('Should not return an authorizationCode when invalid info is passed', () => {
    return expect(model.getAuthorizationCode('dsfhkjsdfgh7923rygu2hr9eyrduf')).rejects.toBeTruthy();
  })
});

describe('generateAccessToken', () => {
  test('Should return an access token for the data passed', () => {
    token = model.generateAccessToken(client[0], users[0] , 'READ');
      expect(typeof token).toBe('string');
  });
});

describe('saveToken', () => {
  test('Should add Token to the db matching parameters passed', async () => {
    let token = {
      accessToken,
      accessTokenExpiresAt: new Date(2018,9,20),

    }
    let res = await model.saveToken(accessToken, refreshToken, client[0], users[0]);
    return expect(res).toEqual(expect.objectContaining({accessToken, refreshToken, client: {id: client[0].id}, user: {id: users[0].id}}));
  });
});

describe('generateAuthorizationCode', () => {
  test('Should generate authorizationCode', () => {
    let res = model.generateAuthorizationCode(client[0], users[0], 'READ');
    return expect(res).toBeTruthy();
  })
});

describe('saveAuthorizationCode', () => {
  test('Should add an authorizationCode to the db matching the parameters passed', async () => {
    let res = await model.saveAuthorizationCode(code, client[0], users[0]);
    return expect(res).toEqual(expect.objectContaining({  user: { id: users[0].id}, client: {id: client[0].id} }));
    //return expect(res).toEqual(expect.objectContaining({ user: { id: users[0].id}}));

 });

  test('Should not save authorizationCode for empty parameters', () => {
    return expect(model.saveAuthorizationCode()).rejects.toBeTruthy();
  });
});

  describe('getAccessToken', () => {
    test('Should return token for valid access token passed', async() => {
      return expect(await model.getAccessToken(accessToken)).toEqual(expect.objectContaining({accessToken}));
    });

    test('Should not return token for invalid access token', () =>{
      return expect(model.getAccessToken('jsdfhksjdhflyr432hw89y4jn')).rejects.toBeTruthy();
    });

    test('Should not return token for empty parameters', () =>{
      return expect(model.getAccessToken()).rejects.toBeTruthy();
    });
});

describe('revokeAuthorizationCode', ()=> {
  test('Should delete authorizationCode with matching parameters', async () => {
    let deletedRes = await model.revokeAuthorizationCode(authorizationCodes[1].code.code);
    return expect(deletedRes.code.code).toBe(authorizationCodes[1].code.code);
  });

  test('Should not delete authorizationCode when invalid parameters are passed', () => {
    return expect(model.revokeAuthorizationCode('jdfhksdhfkjdsfhlajds')).rejects.toBeTruthy();
  });
});
