var mongoose = require('mongoose'),
    User = require('./user'),
    Group = require('./group');

var SubGroup = new mongoose.Schema({
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  title: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('SubGroup', SubGroup);
