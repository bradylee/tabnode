var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var mw = require('../middlewares');
var User = mongoose.model('User');

router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }, '+password', function(err, user) {
    if (!user) {
      return res.status(401).json({ message: 'Invalid username and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username and/or password' });
      }
      res.json({ token: mw.createJWT(user) });
    });
  });
});

router.post('/signup', function(req, res) {
  User.findOne({ username: req.body.username }, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err, result) {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      res.json({ token: mw.createJWT(result) });
    });
  });
});

module.exports = router;