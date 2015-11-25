var group = require('./group'),
    user = require('./user'),
    subgroup = require('./subgroup'),
    chat = require('./chat'),
    meetup = require('./meetup'),
    io = require('socket.io');

// create an object model to represent our Mongoose document schema for chats
var myChat = mongoose.model('message', chat);

// this 'io' object represents the server URL which we will connect all the front end sockets to
io.on('connection', function(socket){

    // this listens for a 'send message' event from a front end socket
    socket.on('store message', function(data) {
        var room = data.subgroup.title;

        // if the socket which we received the data from is not already in the room named after our subgroup, put it in
        if (!socket.in(room)) {
            socket.join(room);
        }

        // instantiate our model per the message's traits
        var trimmedMessage = data.message.trim();
        var newChat = myChat();
        newChat.text = trimmedMessage;
        newChat.subgroup = data.subgroup;
        newChat.user_username = data.currentUser.user_username;
        newChat.user_id = data.currentUser.user_id;

        // saves newChat into our mongodb
        (data.subgroup.chats).save(function(err) {
            if (err) throw err;
            io.in(room).emit('distribute message', newChat);
        });
    });
});

module.exports = function(app) {

    // route to main page
    app.get('/', function(req, res){
        res.render('index');
    });

    app.post('/v1/user/login', user.login);

    app.post('/v1/user', user.signup);

    app.put('/v1/user', user.update);

    app.post('/v1/user/load', user.load);

    app.post('/v1/user/delete', user.deleteUser);

    app.get('/v1/users', user.loadUsers);

    app.post('/v1/user/group', group.checkUserGroup);

    app.post('/v1/user/group/add', group.addUserToGroup);

    app.post('/v1/user/group/remove', group.removeUserFromGroup);

    app.post('/v1/users/group', group.loadGroupUsers);

    app.post('/v1/user/subgroup', subgroup.checkUserSubgroup);

    app.post('/v1/user/subgroup/add', subgroup.addUserToSubgroup);

    app.post('/v1/user/subgroup/remove', subgroup.removeUserFromSubgroup);

    app.post('/v1/users/subgroup', subgroup.loadSubgroupUsers);

    app.post('/v1/group', group.create);

    app.put('/v1/group/name', group.changeGroupName);

    app.post('/v1/group/leave', group.leaveGroup);

    app.get('/v1/groups/:id', group.getGroups);

    app.post('/v1/subgroup', subgroup.create);

    app.put('/v1/subgroup/name', subgroup.changeSubGroupName);

    app.post('/v1/subgroups/group', subgroup.getSubGroups);

    app.post('/v1/subgroup/leave', subgroup.leaveSubGroup);

    app.post('/chat/add', chat.add);

    app.post('/chat/all', chat.all);

    app.post('/v1/meetups', meetup.all);

    app.post('/v1/meetup', meetup.create);

    app.put('/v1/meetup', meetup.update);

    app.post('/v1/meetup/delete', meetup.deleteMeetup)

};