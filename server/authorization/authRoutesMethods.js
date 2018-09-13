const mongoHelper = require('./../models/model');

module.exports = injectedUserDBHelper => {

    //assign the injectedUserDBHelper to the file's userDBHelper
    userDBHelper = injectedUserDBHelper;

    return {registerUser};

}

function registerUser (req, res) {

  const username = req.body.username;
  const password = req.body.password;


  if(!isString(username) || !isString(password)){
    return sendResponse(res, "Invalid Credentials", true);
  }

  mongoHelper.getUser(username, password).then((user) => {
    if(!user){
      return mongoHelper.registerUserInDB(username, password)
    }
    throw new Error('User already exists');
  }).then(sendResponse(res, "Registration was successful", null))
  .catch((error) => {
    sendResponse(res, "Failed to Register User", error);
  });

function sendResponse(res, message, error) {
  res.status(error != null ? error != null ? 400 : 200 : 400)
        .json({
            'message': message,
            'error': error,
        })
}

function isString(param){
  return param != null && (typeof param === 'string'  || parameter instanceof String) ? true : false);
}

}
