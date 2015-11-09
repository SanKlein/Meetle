var mongoose = require('mongoose'),
    User = require('./user');

var Course = new mongoose.Schema({
  title: {
    type: String
  },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
});

module.exports = mongoose.model('Course', Course);
