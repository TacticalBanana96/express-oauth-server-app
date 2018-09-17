const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
  id: {type: String},
	username: {type: String},
	password: {type: String}
});

const User = mongoose.model('user', UserSchema);

module.export = {User};
