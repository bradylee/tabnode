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


router.route('/:tabId/items')
  // GET all items in tab
  .get(function(req, res) {
    mongoose.model('BillItem').find({}, function(err, items) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        res.json(items);
      }
    });
  })

  // ADD item to tab
  .post(function(req, res) {
    var name = req.body.name,
        price = req.body.price;

    mongoose.model('BillItem').create({
      name: name,
      price: price,
      tab: req.params.tabId,
    }, function(err, item) {
      if (err) {
        console.log('POST Error: There was a problem creating: ' + err);
      } else {
        mongoose.model('Tab').update({ _id: req.params.tabId }, { 
          total: total + price,
          $push: { items: item },
        }, function(err, tab) {
          if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
            res.json(tab);
          }
        });
      }
    });
  });


// 
router.route('/:tabId/items/:itemId')
  .post(function(req, res) {
    var userId = req.body.userId;

    mongoose.model('BillItem').findOne({ _id: req.params.itemId, tab: req.params.tabId }, function (err, item) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + item._id);

        item.claims.push(userId);
        item.save(function(err) {
          if (err) {
            res.send('There was a problem adding the information to the database.');
          } else {
            res.json(item);
          }
        });
      }
    });
  });

module.exports = router;