const request = require('supertest');
const {app} = require('./../app');


describe.skip('POST /oauth/authorize', () => {
  test('Should allow access to secret area', (done) => {
    let text = 'grant_type=authorization_code&client_id=1&client_secret=123abc&code=sgdjhgdadhakhdadj39&redirect_uri=http://localhost:/3000/&scope=READ';
    request(app)
   .post('/oauth/authorize')
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwic2NvcGUiOiJSRUFEIiwiaWF0IjoxNTM3MzEwMzc5LCJleHAiOjE1MzczMTM5NzksInN1YiI6IjEifQ.JInJ0i_twklKodOxv0Rwae1j-C7XnraE4ux-BAQgDm4')
   .send(text)
   .expect(200)
   .end(done);
  });

});

// describe('GET /oauth/authorize', () => {
//   test('Should return authorizationCode', (done) => {
//     request(app)
//     .get('/oauth/authorize')
//     .expect(200)
//     .end(done);
//   });
// });


describe.skip('POST /oauth/token', () => {
  test('Should return a token when passed authorization code', (done)=> {
    let text = 'grant_type=authorization_code&client_id=1&client_secret=123abc&code=sgdjhgdadhakhdadj39&redirect_uri=http://localhost:3000/';
    request(app)
    .post('/oauth/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic MToxMjNhYmM=')
    .send(text)
    .expect(200)
    .end(done);
  });
});

describe.skip('ALL /oauth/authenticate', () => {
  test('Should return user information when passed a valid access token', (done) => {
    request(app)
    .get('/oauth/authenticate')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwic2NvcGUiOiJSRUFEIiwiaWF0IjoxNTM3MzEwMzc5LCJleHAiOjE1MzczMTM5NzksInN1YiI6IjEifQ.JInJ0i_twklKodOxv0Rwae1j-C7XnraE4ux-BAQgDm4')
    .send()
    .expect(200)
    .end(done)
  });

  test('Should return status 401 when passed an invalid bearer token', (done)=> {
    request(app)
    .get('/oauth/authenticate')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIiwic2NvcGUiOiJSRUFEIiwiaWF0IjoxNTM3MzEwMzc5LCJleHAiOjE1MzczMTM5NzksInN1YiI6IjEifQ.JInJ0i_twklKodOxv0Rwae1j-C7XnraE4ux-BAQgDm4')
    .send()
    .expect(401)
    .end(done)
  });
});
