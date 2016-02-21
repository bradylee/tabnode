var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
/*  
  open_tab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tab',
  },
*/
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);