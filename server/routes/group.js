var mongoose = require("mongoose"),
    Group = require('../models/group'),
    User = require('../models/user');

module.exports = {

  create : function(req, res) {

    var id = req.body.user_id;

    var group = new Group();

    group.title = req.body.title;
    group.members = [id];

    group.save(function(err){
      if (!err) {
        res.send(group);
      } else {
        res.send(err, 403);
      }
    });
  },

  getGroups : function(req, res) {
    var id = req.params.id;

    Group.find({members: id}).exec(function(err, groups) {
      if (groups) {
        res.send(groups);
      } else {
        res.send(err, 404);
      }
    })
  },

  deleteGroup: function(req, res) {

    var group = req.body._id;

    Group.remove({_id : group}).exec(function(err, group) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        res.status(200).send('Group deleted');
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
  },

  leaveGroup: function (req, res) {
    var user_id = req.body.user;
    var group_id = req.body._id;

    Group.findOneAndUpdate({ _id : group_id }, { $pull: { members : user_id } }, function(err, group) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log('Removed user: ' + user_id);
        res.status(200).send('Removed user from group');
      }
    });
  }

};
