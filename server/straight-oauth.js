const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');

const oauth = new OAuth2Server({ model: require('./models/model')});
let request = new Request({/*...*/});
let response = new Response({/*...*/});

oauth.authenticate(request, response).then((token) => {
    //request was successfully authenticated
}).catch((err) => {
    if (err instanceof AccessDeniedError) {
      //the resource owner has denied access request
    }
    else {
      //Access was not granted due to some other error condition
    }
});

oauth.authorize(request, response).then((token) => {
  
}).catch((err){

});

oauth.token(request, response).then((token) => {
  //the resource owner granted the access request
}). catch((err) => {
  // the request was invalid or not authorized
});
