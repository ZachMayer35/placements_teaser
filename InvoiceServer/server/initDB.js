const mongoose = require('mongoose');


const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connection with database succeeded.');
});

module.exports = db;