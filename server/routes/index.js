var group = require('./group'),
    user = require('./user'),
    subgroup = require('./subgroup'),
    chat = require('./chat'),
    meetup = require('./meetup');

module.exports = function(app) {

  // route to main page
  app.get('/', function(req, res){
    res.render('index');
  });

  app.post('/login', user.login);

    app.post('/v1/user', user.signup);

  app.post('/users', user.all);

  app.post('/group/create', group.create);

  app.post('/group/all', group.all);

  app.post('/group/my', group.my);

  app.post('/subgroup/group', subgroup.all);

  app.post('/subgroup/create', subgroup.create);

  app.post('/chat/add', chat.add);

  app.post('/chat/all', chat.all);

  app.post('/meetups', meetup.all);

  app.post('/meetups/create', meetup.create);

};

