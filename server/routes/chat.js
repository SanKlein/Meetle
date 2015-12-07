var mongoose = require("mongoose"),
    Chat = require('../models/chat');

module.exports = {

  create : function(req, res) {

    var newChat = new Chat();

    newChat.text = req.body.text;
    newChat.subgroup = req.body.subgroup;
    newChat.user_username = req.body.user_username;
    newChat.user_id = req.body.user_id;

    newChat.save(function(err) {
      if (!err) {
        res.json(newChat);
      } else {
        res.status(403).json(err);
      }
    });
  },

  likeChat : function (req, res) {
    var id = req.body._id;
    var liked = !req.body.liked;

    Chat.findOneAndUpdate({_id : id}, {liked: liked}).exec(function(err, chat) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        res.status(200).send(chat);
      }
    });
  },

  getChat : function(req, res) {
    var subgroup = req.body.subgroup;

    Chat.find({subgroup: subgroup}).sort({sent:-1}).exec(function(err, chats) {
      if (chats) {
        res.json(chats);
      } else {
        res.status(403).json(err);
      }
    });
  }

};
