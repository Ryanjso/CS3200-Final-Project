const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

// initialize DB
const { mongoose } = require('./db');

const port = 3750;

app.listen(port, () => console.log('Server started at port : ' + port));

// import controllers
const userController = require('./controllers/userController');
const orderController = require('./controllers/orderController');
const itemController = require('./controllers/itemController');

app.use('/user', userController);
app.use('/order', orderController);
app.use('/item', itemController);

app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
