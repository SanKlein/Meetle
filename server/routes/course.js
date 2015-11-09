var mongoose = require("mongoose"),
    Course = require('../models/course');

module.exports = {

  create : function(req, res) {

    var course = new Course();

    course.title = req.body.title;

    course.save(function(err){
      if (!err) {
        res.json(course);
      } else {
        res.send(err, 403);
      }
    });
  },

  all : function(req, res) {
    Course.find().sort({title: 1}).exec(function(err, courses) {
      if (courses) {
        res.send(courses);
      } else {
        res.send(err, 404);
      }
    })
  },

  my : function(req, res) {
    var id = req.body._id;
    Course.find().sort({title: 1}).exec(function(err, courses) {
      if (courses) {
        res.send(courses);
      } else {
        res.send(err, 404);
      }
    })
  }

  /*add : function(req, res) {
    var user = req.body.user;
    var id = req.body._id;
    Course.
  }*/
};
