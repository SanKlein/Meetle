var mongoose = require('mongoose'),
    User = require('./user'),
    SubGroup = require('./subgroup');

var Group = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Group', Group);
