var mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    User = mongoose.model('User');

module.exports = {

  // GET /users
  getUsers: function (req, res) {
    User.find({}, function (error, users) {
      res.json(users);
    });
  },

  // POST /users/sign_in
  login: function (req, res) {

    var username = req.body.username;

    if (username) {
      User.findOne({username: username}, function (error, user) {
        if (error)
          console.log(error);
        if (user) {
          res.json(user);
        } else {
          var user = new User();

          user.username = username;

          user.save(function(err){
            if (!err) {
              res.json(user);
            } else {
              res.send(err, 403);
            }
          });
        }
      });
    } else {
      console.log("no credentials submitted");
      res.send("fail", 500);
    }
  },

  signup: function (req, res) {
    var username = req.body.username;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var password = req.body.password1;

    User.findOne({username : username}, function(err, user) {
      if (user) {
        res.status(403).send('Sorry, username is already taken');
      } else {
        var newUser = new User();

        newUser.username = username;
        newUser.first_name = first_name;
        newUser.last_name = last_name;

        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(9));

        newUser.save(function(err) {
          if (err) {
            res.status(403).send('Failed to save user');
          } else {
            res.json(newUser);
          }
        });
      }
    });
  },

  all: function (req, res) {
    User.find().exec(function(err, users) {
      if (users) {
        res.send(users);
      } else {
        res.send(err);
      }
    })
  }
};
