const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  orderId: { type: mongoose.Types.ObjectId, ref: 'Order' },
  itemType: { type: String, enum: ['Pizza', 'Drink'] },
  size: { type: String, enum: ['small', 'medium', 'large'] },

  // for type drink
  type: {
    type: String,
    enum: ['coke', 'diet coke', 'sprite', 'ginger ale', 'lemonade', 'orange fanta'],
  },
  ice: Boolean,

  // for type pizza
  protein: {
    type: String,
    enum: ['pepperoni', 'sausage', 'chicken', 'bacon', 'vegan chorizo'],
  },
  veggie: {
    type: String,
    enum: ['peppers', 'onions', 'mushrooms', 'spinach', 'olives'],
  },
  cheese: Boolean,
  sauce: Boolean,

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

ItemSchema.pre('save', function (next) {
  this.updated = Date.now;
  next();
});

const Item = mongoose.model('Item', ItemSchema, 'items');

module.exports = { Item };
