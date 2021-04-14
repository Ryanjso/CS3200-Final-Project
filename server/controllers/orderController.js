const express = require('express');
const { Item } = require('../models/item');
const { Order } = require('../models/order');
const router = express.Router();

// create an order
router.post('/create', async (req, res) => {
  const orderData = req.body;

  let order = new Order(orderData);
  order = await order.save();

  let orderWithUser = await Order.findById(order._id).populate({
    path: 'userId',
    select: { firstName: 1, lastName: 1 },
  });

  res.send(orderWithUser);
});

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().populate({
    path: 'userId',
    select: { firstName: 1, lastName: 1 },
  });
  res.send(orders);
});

// get a certain order and all items of a certain order
router.get('/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  // find the order
  const order = (await Order.findById(orderId).populate('userId')).toObject();

  // find the items in the order
  const items = await Item.find({ orderId });
  order.items = items;

  res.send(order);
});

// Update an order
router.patch('/update/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const newOrderFields = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { $set: newOrderFields },
    { new: true }
  ).populate({
    path: 'userId',
    select: { firstName: 1, lastName: 1 },
  });

  res.send(updatedOrder);
});

// Delete an order
router.delete('/delete/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  const removedOrder = await Order.findByIdAndRemove(orderId);

  // delete all items with this orderId
  Item.deleteMany({ orderId }).exec();

  res.send(removedOrder);
});

module.exports = router;
