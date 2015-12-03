var mongoose = require("mongoose"),
  Meetup = require('../models/meetup');

module.exports = {

  all: function(req, res) {

    var subgroup = req.body._id;

    Meetup.find({subgroup: subgroup}).exec(function(err, meetups) {
      if (!err) {
        res.send(meetups);
      } else {
        res.send(err, 404);
      }
    });
  },

  create: function(req, res) {

    var meetup = new Meetup();

    meetup.subgroup = req.body.subgroup_id;
    meetup.date = req.body.date;
    meetup.time = req.body.time;
    meetup.location = req.body.location;

    meetup.save(function(err){
      if (!err) {
        res.send(meetup);
      } else {
        res.send(err, 403);
      }
    });
  },

  update: function (req, res) {
    var id = req.body._id;
    var date = req.body.date;
    var time = req.body.time;
    var location = req.body.location;

    Meetup.findOneAndUpdate({ _id : id }, { date: date, time:time, location:location}, function(err) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log('Updated meeting: ' + location + " " + date + " " + time);
        res.status(200).send('Meeting updated');
      }
    });
  },

  deleteMeetup: function (req, res) {
    var meetup_id = req.body._id;

    Meetup.remove({_id : meetup_id}).exec(function(err, meetup) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        res.status(200).send('Meetup deleted');
      }
    });
  }

};