var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var mw = require('../middlewares');
var User = mongoose.model('User');

router.use('/:username', mw.ensureAuthenticated);

/* GET users listing. */
router.route('/:username')
  .get(function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving username: ' + user._id);

        res.json(user);
      }
    });
  })

  .put(function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if (!user)
        return res.status(400).json({ message: 'User not found' });

      user.first_name = req.body.first_name || user.first_name;
      user.last_name = req.body.last_name || user.last_name;

      user.save(function(err) {
        res.status(200).end();
      });
    });
  });

router.route('/:username/friends')
  .get(function(req, res) {
    User.findOne({username: req.params.username})
      .populate('friends')
      .exec(function(err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving username: ' + user._id);

        res.json(user.friends);
      }
    });
  });

router.route('/:username/friends/add')


module.exports = router;
