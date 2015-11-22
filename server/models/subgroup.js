var mongoose = require('mongoose'),
    User = require('./user'),
    Group = require('./group'),
    Chat = require('./chat');

var SubGroup = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  title: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }],
});

module.exports = mongoose.model('SubGroup', SubGroup);