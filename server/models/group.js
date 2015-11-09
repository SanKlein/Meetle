var mongoose = require('mongoose'),
    User = require('./user'),
    Course = require('./course');

var Group = new mongoose.Schema({
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Group', Group);
