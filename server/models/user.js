var mongoose = require('mongoose');

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
  },
  groups: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Groups',
    default: []
  },
  subgroups: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'SubGroups',
    default: []
  },
  meetups: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Meetups',
    default: []
  }
});

module.exports = mongoose.model('User', User);
