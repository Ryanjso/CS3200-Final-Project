const express = require('express');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const router = express.Router();

// Create a new user
router.post('/create', async (req, res) => {
  const userData = req.body;

  let user = new User(userData);
  user = await user.save();

  res.send(user);
});

// return all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// get a certain user and all orders of a certain user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  const user = (await User.findById(userId)).toObject();

  // Find a users order
  const orders = await Order.find({ userId });
  user.orders = orders;

  res.send(user);
});

// update a user
router.patch('/update/:userId', async (req, res) => {
  const userId = req.params.userId;
  const newUserFields = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, { $set: newUserFields }, { new: true });

  res.send(updatedUser);
});

// delete a user
router.delete('/delete/:userId', async (req, res) => {
  const userId = req.params.userId;

  const removedUser = await User.findByIdAndRemove(userId);

  res.send(removedUser);
});

module.exports = router;
