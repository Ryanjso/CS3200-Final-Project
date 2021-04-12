const express = require('express');
const { Item } = require('../models/item');
const { Order } = require('../models/order');
const router = express.Router();

// create an order
router.post('/create', async (req, res) => {
  const orderData = req.body;

  let order = new Order(orderData);
  order = await order.save();

  res.send(order);
});

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// get all items of a certain order
router.get('/orderId', async (req, res) => {
  const orderId = req.params.orderId;

  // find the order
  const order = (await Order.findById(orderId)).toObject();

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
  );

  res.send(updatedOrder);
});

// Delete an order
router.delete('/delete/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  const removedOrder = await Order.findByIdAndRemove(orderId);

  res.send(removedOrder);
});

module.exports = router;
