var mongoose = require("mongoose"),
    Group = require('../models/group'),
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
  },

  deleteSubGroup: function(req, res) {
    var subgroup = req.body._id;

    SubGroup.remove({_id : subgroup}).exec(function(err, subgroup) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        res.status(200).send('SubGroup deleted');
      }
    });
  },

  changeGroupName: function (req, res) {
    var id = req.body._id;
    var title = req.body.title;

    Group.findOneAndUpdate({ _id : id }, { title: title }, function(err) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log('Updated group: ' + title);
        res.status(200).send('Group updated');
      }
    });
  }

};
