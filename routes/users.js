var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/')
  //GET all users
  .get(function(req, res, next) {
    //retrieve all users from Monogo
    mongoose.model('User').find({}, function (err, users) {
      if (err) {
        return console.error(err);
      } else {
        //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
        res.format({
          //HTML response will render the index.jade file in the views/users folder. We are also setting 'users' to be an accessible variable in our jade view
          html: function(){
            res.render('users/index', {
                  title: 'All my users',
                  'users' : users
              });
          },
          //JSON response will show all users in JSON format
          json: function(){
            res.json(users);
          }
        });
      }     
    });
  })

  //POST a new user
  .post(function(req, res) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the 'name' attributes for forms
    var firstName = req.body.firstName,
        lastName = req.body.lastName;

    //call the create function for our database
    mongoose.model('User').create({
      firstName : firstName,
      lastName: lastName,
    }, function (err, user) {
      if (err) {
        res.send('There was a problem adding the information to the database.');
      } else {
        // user has been created
        console.log('POST creating new user: ' + user);
        res.format({
            //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
          html: function(){
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location('users');
            // And forward to success page
            res.redirect('/users');
          },
          //JSON response will show the newly created user
          json: function(){
            res.json(user);
          }
        });
      }
    });
  });


router.route('/:id')
  .get(function(req, res) {
    mongoose.model('User').findById(req.id, function (err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + user._id);
        var firstName = user.firstName,
            lastName = user.lastName;

        res.format({
          html: function(){
            res.render('users/show', {
              'user' : user
            });
          },
          json: function(){
            res.json(user);
          }
        });
      }
    });
  });


module.exports = router;