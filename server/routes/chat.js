var mongoose = require("mongoose"),
    Chat = require('../models/chat');

module.exports = {

  addChat : function(req, res) {

    var newChat = new Chat();

    newChat.text = req.body.text;
    newChat.subgroup = req.body.subgroup;
    newChat.user_username = req.body.user_username;
    newChat.user_id = req.body.user_id;
    newChat.sent = date();

    newChat.save(function(err) {
      if (!err) {
        res.json(chat);
      } else {
        res.status(403).json(err);
      }
    });
  },

  likeChat : function (req, res) {
    var id = req.body._id;

    Chat.findOneAndUpdate({_id : id}, {liked: true}, function(err) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        res.status(200).send('Chat liked');
      }
    });
  }


  // Parker's
  /*
  all : function(req, res) {

    Chat.find().sort({sent:-1}).exec(function(err, chats) {
      if (chats) {
        res.json(chats);
      } else {
        res.status(403).json(err);
      }
    });
  }
  */

};
