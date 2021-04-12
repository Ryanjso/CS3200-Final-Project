const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://willandryan:HIAA2OyNXmZ0VXVL@cluster0.egbpk.mongodb.net/test?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }
  )
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log('Error in DB connection : ' + JSON.stringify(err));
  });

module.exports = mongoose;

// willandryan
// HIAA2OyNXmZ0VXVL
