var mongoose = require('mongoose');
var tabSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  closed_at: { type: Date, default: null },
/*
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
*/
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BillItem',
  }],
  total: Number,
});

module.exports = mongoose.model('Tab', tabSchema);