var mongoose = require("mongoose"),
    Group = require('../models/group'),
    User = require('../models/user');;

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
  }
};
