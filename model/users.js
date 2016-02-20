var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  open_tabs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tab',
  }],
});

module.exports = mongoose.model('User', userSchema);