var mongoose = require('mongoose');

// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://daria.gonsalves@hyuna.bb:FuckH3roku@ds245082.mlab.com:45082/todoapp'
// };
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

module.exports = {mongoose};
