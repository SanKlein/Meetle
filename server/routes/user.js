var mongoose = require("mongoose"),
    bcrypt = require("bcryptjs"),
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
    var password = req.body.password;

    if (username) {
      User.findOne({username: username}, function (error, user) {
        if (user) {
          var match = bcrypt.compareSync(password, user.password);

          if (match) {
            res.send(user);
          } else {
            res.status(401).send("password is incorrect");
          }
        } else {
          res.status(401).send("username not found");
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

  update: function (req, res) {
    var id = req.body._id;
    var username = req.body.username;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    User.findOneAndUpdate({ _id : id }, { username: username, first_name:first_name, last_name:last_name}, function(err) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log('Updated user: ' + username);
        res.status(200).send('User updated');
      }
    });
  },

  deleteUser: function (req, res) {
    var id = req.body._id;

    User.remove({ _id:id }).exec(function(err, user) {
      if(err) {
        res.status(500).send({ error: 'Internal server error.' });
      } else {
        if(user) {
          console.log('Deleted user: ' + user);
          res.status(200).send(user);
        } else {
          res.status(404).send({ error: 'User does not exist' });
        }
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
  },

  groups: function(req, res) {
    var id = req.body._id;
    User.find({_id: id}, {groups: 1}).exec(function(err, groups) {
      if (err) {
        res.status(500).send("Couldn't find groups");
      } else {
        res.status(200).send(groups);
      }
    })
  },

  addGroup: function(req, res) {
    var id = req.body.user_id;
    var group = req.body._id;

    User.findOneAndUpdate({_id : id}, {$push: {groups: group}}).exec(function(err) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log(group);
        res.status(200).send('Group updated');
      }
    });
  },

  deleteGroup: function(req, res) {
    var id = req.body.user_id;
    var group = req.body._id;

    console.log(id);
    console.log(group);

    User.findOneAndUpdate({_id : id}, {$pull: {groups: group}}).exec(function(err) {
      if (err) {
        res.status(500).send('Internal server error.');
      } else {
        console.log('delete group');
        res.status(200).send('Group deleted');
      }
    });
  }
};
