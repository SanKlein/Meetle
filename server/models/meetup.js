var mongoose = require('mongoose'),
    User = require('./user'),
    SubGroup = require('./subgroup'),
    Group = require('./group');

var Meetup = new mongoose.Schema({
  subgroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubGroup'
  },
  time: {
    type: String
  },
  date: {
    type: String
  },
  location: {
    type: String
  }
});

module.exports = mongoose.model('Meetup', Meetup);
