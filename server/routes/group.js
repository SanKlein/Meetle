var mongoose = require("mongoose"),
    Group = require('../models/group');

module.exports = {

  create : function(req, res) {

    var group = new Group();

    group.title = req.body.title;

    group.save(function(err){
      if (!err) {
        res.json(group);
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
