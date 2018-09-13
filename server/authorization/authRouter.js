/**
 *
 * @param router - we assign routes and endpoint functions for each route
 *                  to this object.
 *
 * @param app - an instance of the express app. By applying
 *                     expressApp.oauth.grant() method to an endpoint
 *                     the endpoint will return a bearer token
 *                     to the client if it provides valid credentials.
 *
 * @param authRoutesMethods - an object which contains the registration method. It
 *                           can be populated with other methods such as deleteUser()
 *                           if you decide to build out of this project's structure.
 * @return {route}
 */


 module.exports = (router, app, authRoutesMethods) => {
   router.post('/registerUser', authRoutesMethods.registerUser);
   router.post('/login', app.oauth.grant());
   return router;
 };
