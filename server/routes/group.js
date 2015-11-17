var mongoose = require("mongoose"),
    Group = require('../models/group'),
    User = require('../models/user');;

module.exports = {

  create : function(req, res) {

    var id = req.body.user_id;

    var group = new Group();

    group.title = req.body.title;
    group.members = [id];

    group.save(function(err){
      if (!err) {
        User.findOneAndUpdate({_id : id }, {$push: {groups: group._id}}).exec(function(err) {
          if (err) {
            res.status(500).send('Internal server error.');
          } else {
            console.log('group created');
            console.log(group);
            res.status(200).send('Group updated');
          }
        });
      } else {
        res.send(err, 403);
      }
    });
  },

  all : function(req, res) {
    Group.find().sort({title: 1}).exec(function(err, groups) {
      if (groups) {
        res.send(groups);
      } else {
        res.send(err, 404);
      }
    })
  },

  groups : function(req, res) {
    var username = req.body.username;
    Group.find({}).sort({dateCreated: 1}).exec(function(err, groups) {
      if (groups) {
        res.send(groups);
      } else {
        res.send(err, 404);
      }
    })
  }
};
