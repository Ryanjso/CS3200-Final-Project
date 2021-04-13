const express = require('express');
const { Item } = require('../models/item');
const router = express.Router();

// create an item
router.post('/create', async (req, res) => {
  const itemData = req.body;

  let item = new Item(itemData);
  item = await item.save();

  let itemPopulated = await Item.findById(item._id).populate({
    path: 'orderId',
    populate: { path: 'userId', select: { firstName: true, lastName: true } },
  });

  res.send(itemPopulated);
});

// get all items

router.get('/', async (req, res) => {
  const items = await Item.find().populate({
    path: 'orderId',
    populate: { path: 'userId', select: { firstName: true, lastName: true } },
  });
  res.send(items);
});

// get a certain item
router.get('/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  const item = await Item.findById(itemId).populate({
    path: 'orderId',
    populate: { path: 'userId' },
  });

  res.send(item);
});

// update an item
router.patch('/update/:itemId', async (res, req) => {
  const itemId = req.req.params.itemId;
  const newItemFields = req.req.body;

  const updatedItem = await Item.findByIdAndUpdate(
    itemId,
    { $set: newItemFields },
    { new: true }
  ).populate({
    path: 'orderId',
    populate: { path: 'userId', select: { firstName: true, lastName: true } },
  });

  req.req.res.send(updatedItem);
});

// detele an item
router.delete('/delete/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  const removedItem = await Item.findByIdAndRemove(itemId);

  res.send(removedItem);
});

module.exports = router;
