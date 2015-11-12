var mongoose = require("mongoose"),
  SubGroup = require('../models/subgroup');

module.exports = {

  all : function(req, res) {

    var user = req.body.user;
    var group = req.body._id;

    SubGroup.find({group: group}).sort({_id: 1}).exec(function(err, groups) {
      if (groups) {
        res.send(groups);
      } else {
        res.send(err, 404);
      }
    })
  },

  create: function(req, res) {

    var subgroup = new SubGroup();

    subgroup.group = req.body.group;
    subgroup.title = req.body.title;

    subgroup.save(function(err){
      if (!err) {
        res.json(subgroup);
      } else {
        res.send(err, 403);
      }
    });
  }

};
