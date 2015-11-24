var mongoose = require('mongoose'),
    io = require('socket.io'),
    User = require('./user'),
    SubGroup = require('./subgroup');

var Chat = new mongoose.Schema({
  text: {
    type: String
  },
  subgroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubGroup'
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
  },
  liked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Chat', Chat);