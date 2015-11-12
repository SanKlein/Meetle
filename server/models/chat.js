var mongoose = require('mongoose'),
    User = require('./user');

var Chat = new mongoose.Schema({
  text: {
    type: String
  },
  user_username: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sent: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', Chat);
