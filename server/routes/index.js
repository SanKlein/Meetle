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

    app.post('/v1/user/delete', user.deleteUser);

    app.post('/v1/group', group.create);

    app.put('/v1/group/name', group.changeGroupName);

    app.post('/v1/group/delete', group.deleteGroup);

    app.post('/v1/group/leave', group.leaveGroup);

    app.get('/v1/groups/:id', group.getGroups);

    app.post('/v1/subgroup', subgroup.create);

    app.put('/v1/subgroup/name', subgroup.changeSubGroupName);

    app.post('/v1/subgroups/group', subgroup.getSubGroups);

    app.post('/v1/subgroup/leave', subgroup.leaveSubGroup);

    app.post('/v1/subgroup/delete', subgroup.deleteSubGroup);

    app.post('/chat/add', chat.add);

    app.post('/chat/all', chat.all);

    app.post('/v1/meetups', meetup.all);

    app.post('/v1/meetup', meetup.create);

    app.post('/v1/meetup/delete', meetup.deleteMeetup);

    app.put('/v1/meetup', meetup.update);

};

