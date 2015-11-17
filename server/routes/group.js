var mongoose = require("mongoose"),
    Group = require('../models/group'),
    User = require('../models/user');

module.exports = {

  create : function(req, res) {

    var id = req.body.user_id;
    console.log(id);

    var group = new Group();

    group.title = req.body.title;
    console.log(req.body.title);
    group.members = [id];

    console.log(group);

    group.save(function(err){
      if (!err) {
        res.send(group);
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

  getGroup : function(req, res) {
    var id = req.params.id;
    Group.find({_id: id}).exec(function(err, group) {
      if (group) {
        res.send(group);
      } else {
        res.send(err, 404);
      }
    })
  },

  deleteGroup: function(req, res) {
    console.log('heres the group id');
    console.log(req.body._id);

    var group = req.body._id;

    Group.remove({_id : group}).exec(function(err, group) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log('delete group');
        res.status(200).send('Group deleted');
      }
    });
  }
};
