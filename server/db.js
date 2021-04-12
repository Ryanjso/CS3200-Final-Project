const mongoose = require('mongoose');

require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.egbpk.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log('Error in DB connection : ' + JSON.stringify(err));
  });

module.exports = mongoose;
