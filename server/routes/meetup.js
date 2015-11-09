var mongoose = require("mongoose"),
  Meetup = require('../models/meetup');

module.exports = {

  all: function(req, res) {

    Meetup.find().exec(function(err, meetups) {
      console.log('all meet ups found');
      console.log(meetups);
      if (!err) {
        res.send(meetups);
      } else {
        res.send(err, 404);
      }
    });
  },

  create: function(req, res) {

    var meetup = new Meetup();
    console.log('new meet up');
    console.log(meetup);

    console.log('body');
    console.log(req.body);

    meetup.course = req.body.course;
    meetup.group = req.body.group;
    meetup.date = req.body.date;
    meetup.time = req.body.time;
    meetup.location = req.body.location;

    console.log('meetup to save');
    console.log(meetup);

    meetup.save(function(err){
      if (!err) {
        res.json(meetup);
      } else {
        res.send(err, 403);
      }
    });
  }

};
