const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  this.updated = Date.now;
  next();
});

const Order = mongoose.model('Order', OrderSchema, 'orders');

module.exports = { Order };
