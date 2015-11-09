var mongoose = require('mongoose');

var Chat = new mongoose.Schema({
  text: {
    type: String
  },
  user_username: {
    type: String
  },
  sent: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Chat', Chat);
