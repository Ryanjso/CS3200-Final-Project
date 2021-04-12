const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  orderId: { type: mongoose.Types.ObjectId, ref: 'Order' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

ItemSchema.pre('save', function (next) {
  this.updated = Date.now;
  next();
});

const Item = mongoose.model('Item', ItemSchema, 'items');

module.exports = { Item };
