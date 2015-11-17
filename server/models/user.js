var mongoose = require('mongoose'),
    SubGroup = require('./subgroup'),
    Meetup = require('./meetup'),
    Group = require('./group');

var User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: './../../www/img/ionic.png'
  }
});

module.exports = mongoose.model('User', User);
