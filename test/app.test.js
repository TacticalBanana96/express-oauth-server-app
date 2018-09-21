const request = require('supertest');
const {app} = require('./../app');


describe('POST /oauth/authorize', () => {
  test('Should return authorizationCode', () => {
    request(app)
   .post('/oauth/authorize')
   .expect(200)
   .end(done);
  })
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
    let text = 'grant_type=authorization_code&client_id=1&client_secret=123abc&code=sgdjhgdadhakhdadj39&redirect_uri=http://localhost:/3000/';
    request(app)
    .post('/oauth/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic MToxMjNhYmM=')
    .send(text)
    .expect(200)
    .end(done);
  });
});
