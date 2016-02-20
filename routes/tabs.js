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
  //GET all tabs
  .get(function(req, res, next) {
    //retrieve all tabs from Monogo
    mongoose.model('Tab').find({}, function (err, tabs) {
      if (err) {
        return console.error(err);
      } else {
        //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
        res.json(tabs);
      }     
    });
  })


  //POST a new tab
  .post(function(req, res) {
    // Get values from POST request. These can be done through forms or REST calls. These rely on the 'name' attributes for forms
    var name = req.body.name,
        ownerId = req.body.ownerId,
        total = req.body.total,
        members = req.body.members;

    // get the user
    mongoose.model('User').findById(ownerId, function (err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + user._id);

        // then create the tab
        mongoose.model('Tab').create({
          name : name,
          owner: user._id,
          total: total,
          members: members,
        }, function (err, tab) {
          if (err) {
            res.send('There was a problem adding the information to the database.');
          } else {
            // tab has been created
            console.log('POST creating new tab: ' + tab);

            // add tab to user
            user.open_tab = tab._id;
            user.save(function(err) {
              if (err) {
                res.send('There was a problem adding the information to the database.');
              } else {

                mongoose.model('User').update({_id: { $in: members}}, {open_tab: tab}, {multi: true}, function(err, users) {
                  if (err) {
                    console.log('PUT Error: There was a problem updating: ' + err);
                  } else {
                    console.log('PUT updating: ' + users);
                    res.json(tab);
                  }
                });
              }
            });
          }
        });
      }
    });
  });


router.route('/:id')
  // GET tab by id
  .get(function(req, res) {
    mongoose.model('Tab').findById(req.params.id, function (err, tab) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + tab._id);

        res.json(tab);
      }
    });
  })

/*
  //PUT to update a tab by ID
  .put(function(req, res) {
    var name = req.body.name,
        addedMembers = req.body.addedMembers,
        removedMembers = req.body.removedMembers;

    mongoose.model('Tab').update({ _id: req.params.id }, { $pullAll: { members: removedMembers } }, function(err, tab) {

    });
  });
*/


module.exports = router;