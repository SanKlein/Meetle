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

    app.post('/v1/user/login', user.login);

    app.post('/v1/user', user.signup);

    app.put('/v1/user', user.update);

    app.post('/v1/users', user.all);

    app.post('/v1/user/groups', user.groups);

    app.post('/v1/user/group', user.addGroup);

    app.post('/v1/user/group/delete', user.deleteGroup);

    app.post('/v1/group', group.create);

    app.post('/v1/group/delete', group.deleteGroup);

    app.post('/v1/group/:id', group.getGroup);

    app.post('/group/all', group.all);

    app.post('/subgroup/group', subgroup.all);

    app.post('/subgroup/create', subgroup.create);

    app.post('/chat/add', chat.add);

    app.post('/chat/all', chat.all);

    app.post('/meetups', meetup.all);

    app.post('/meetups/create', meetup.create);

};

