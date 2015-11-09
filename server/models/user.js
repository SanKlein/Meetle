var mongoose = require('mongoose');

var User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true
  }
});

module.exports = mongoose.model('User', User);
