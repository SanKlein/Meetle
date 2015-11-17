var mongoose = require("mongoose"),
  SubGroup = require('../models/subgroup');

module.exports = {

  create: function(req, res) {

    var group = req.body._id;
    var title = req.body.subgroup_title;
    var user = req.body.user_id;
    var subgroup = new SubGroup();

    subgroup.group = group;
    subgroup.title = title;
    subgroup.members = [user];

    subgroup.save(function(err){
      if (!err) {
        res.send(subgroup);
      } else {
        res.send(err, 403);
      }
    });
  },

  getSubGroups: function(req, res) {
    var id = req.body._id;
    var user = req.body.user;

    SubGroup.find({group: id, members: user}).exec(function(err, subgroups) {
      if (!err) {
        res.send(subgroups);
      } else {
        res.send(err, 403);
      }
    });
  }

};
