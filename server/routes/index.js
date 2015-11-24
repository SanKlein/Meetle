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
        var trimmedMessage = data.message.trim();

        // create a JSON object which is an instance of the object model representing our Mongoose chat schema
        var newChat = new myChat({
            text: trimmedMessage, user_username: data.username, subgroup: data.subgroup});

        // saves newChat into our mongodb
        newChat.save(function(err) {
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

    app.post('/v1/users', user.all);

    app.post('/v1/user/delete', user.deleteUser);

    app.post('/v1/group', group.create);

    app.post('/v1/group/delete', group.deleteGroup);

    app.get('/v1/groups/:id', group.getGroups);

    app.post('/v1/subgroup', subgroup.create);

    app.post('/v1/subgroup/group', subgroup.getSubGroups);

    app.post('/v1/subgroup/delete', subgroup.deleteSubGroup);

    app.post('/chat/add', chat.add);

    app.post('/chat/all', chat.all);

    app.post('/v1/meetups', meetup.all);

    app.post('/v1/meetup', meetup.create);

    app.post('/v1/meetup/delete', meetup.deleteMeetup);

    app.put('/v1/meetup', meetup.update);

};