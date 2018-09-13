const mongoose = require('mongoose');

const uristring = 'mongodb://localhost:27017/test';

mongoose.Promise = global.Promise;

mongoose.connect(uristring);


module.exports = {mongoose};
