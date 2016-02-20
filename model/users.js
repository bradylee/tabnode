var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,

});
mongoose.model('User', userSchema);