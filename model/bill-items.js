var mongoose = require('mongoose');
var billItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  claims: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  tab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tab',
  },
});

module.exports = mongoose.model('BillItem', billItemSchema);