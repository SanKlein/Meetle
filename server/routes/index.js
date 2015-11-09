var course = require('./course'),
    user = require('./user'),
    group = require('./group'),
    chat = require('./chat'),
    meetup = require('./meetup');

module.exports = function(app) {

  // route to main page
  app.get('/', function(req, res){
    res.render('index');
  });

  app.post('/login', user.login);

  app.post('/users', user.all);

  app.post('/course/create', course.create);

  app.post('/course/all', course.all);

  app.post('/course/my', course.my);

  app.post('/group/course', group.all);

  app.post('/group/create', group.create);

  app.post('/chat/add', chat.add);

  app.post('/chat/all', chat.all);

  app.post('/meetups', meetup.all);

  app.post('/meetups/create', meetup.create);

};

