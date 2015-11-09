var mongoose = require("mongoose"),
  Group = require('../models/group');

module.exports = {

  all : function(req, res) {

    var user = req.body.user;
    var course = req.body._id;

    Group.find({course: course}).sort({_id: 1}).exec(function(err, courses) {
      if (courses) {
        res.send(courses);
      } else {
        res.send(err, 404);
      }
    })
  },

  create: function(req, res) {

    var group = new Group();

    group.course = req.body.course;
    group.title = req.body.title;

    group.save(function(err){
      if (!err) {
        res.json(group);
      } else {
        res.send(err, 403);
      }
    });
  }

};
