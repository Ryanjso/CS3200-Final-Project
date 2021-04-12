const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

const port = 3750;

app.listen(port, () => console.log('Server started at port : ' + port));

// import controllers
const userController = require('./controllers/userController');

app.use('/users', userController);

module.exports = app;
