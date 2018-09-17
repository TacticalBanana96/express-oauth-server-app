const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
  id: String,
	username: String,
	password: String
});

const userInstance = mongoose.model('user', UserSchema);

module.export = {userInstance};
