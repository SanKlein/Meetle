var mongoose = require("mongoose"),
    Chat = require('../models/chat');

module.exports = {

  addChat : function(req, res) {

    var chat = new Chat();

    chat.text = req.body.text;
    chat.subgroup = req.body.subgroup;
    chat.user_username = req.body.user_username;
    chat.user_id = req.body.user_id;
    chat.sent = date();

    chat.save(function(err) {
      if (!err) {
        res.json(chat);
      } else {
        res.status(403).json(err);
      }
    });
  },

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
