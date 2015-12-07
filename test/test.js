var assert = require('assert'),
    request = require('supertest'),
    server = require('../server');

var app = server.app;

describe('Meetle Test Suite', function() {

    var testData = {
        user_id: '',
        group_id: '',
        subgroup_id: '',
        chat_id: ''
    };

    it('POST /v1/user : respond with status code 200, check first_name, check last_name, check username', function(done) {
        var signupData = {
            'username': 'TestAccount',
            'first_name' : 'Test',
            'last_name': 'Account',
            'password1': 'password'
        };
        request(app)
            .post('/v1/user')
            .set('Accept', 'application/json')
            .send(signupData)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                testData.user_id = res.body._id;
                assert.equal(res.body.username, 'TestAccount');
                assert.equal(res.body.first_name, 'Test');
                assert.equal(res.body.last_name, 'Account');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('GET /v1/users : respond with status code 200', function (done) {
        request(app)
            .get('/v1/users')
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/login : respond with status code 200, check username, check first_name, check last_name', function (done) {
        var loginData = {
            'username': 'TestAccount',
            'password': 'password'
        };
        request(app)
            .post('/v1/user/login')
            .set('Accept', 'application/json')
            .send(loginData)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.body.username, 'TestAccount');
                assert.equal(res.body.first_name, 'Test');
                assert.equal(res.body.last_name, 'Account');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/load : respond with status code 200, check username, check first_name, check last_name', function (done) {
        var user = {
            id : testData.user_id
        };
        request(app)
            .post('/v1/user/load')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                console.log(res.body);
                assert.equal(res.body[0].username, 'TestAccount');
                assert.equal(res.body[0].first_name, 'Test');
                assert.equal(res.body[0].last_name, 'Account');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('GET /v1/groups/:id : respond with status code 200', function (done) {
        request(app)
            .get('/v1/groups/' + testData.user_id)
            .set('Accept', 'application/json')
            .send()
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/group : respond with status code 200, check title', function (done) {
        var group = {
            user_id: testData.user_id,
            title: 'TestGroup'
        };
        request(app)
            .post('/v1/group')
            .set('Accept', 'application/json')
            .send(group)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                testData.group_id = res.body._id;
                assert.equal(res.body.title, 'TestGroup');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/subgroup : respond with status code 200, check title', function (done) {
        var subgroup = {
            user_id: testData.user_id,
            subgroup_title: 'TestSubGroup',
            _id: testData.group_id
        };
        request(app)
            .post('/v1/subgroup')
            .set('Accept', 'application/json')
            .send(subgroup)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                testData.subgroup_id = res.body._id;
                assert.equal(res.body.title, 'TestSubGroup');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/subgroups/group : respond with status code 200', function (done) {
        var subgroup = {
            user: testData.user_id,
            _id: testData.group_id
        };
        request(app)
            .post('/v1/subgroups/group')
            .set('Accept', 'application/json')
            .send(subgroup)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                testData.subgroup_id = res.body[0]._id;
                assert.equal(res.body[0].title, 'TestSubGroup');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/chat/add : respond with status code 200 and send correct chat info', function (done) {
        var chat = {
            text: 'test',
            user_id: testData.user_id,
            user_username: 'TestAccount',
            subgroup: testData.subgroup_id
        };
        request(app)
            .post('/v1/chat/add')
            .set('Accept', 'application/json')
            .send(chat)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                testData.chat_id = res.body._id;
                assert.equal(res.status, 200);
                assert.equal(res.body.text, 'test');
                assert.equal(res.body.user_id, testData.user_id);
                assert.equal(res.body.user_username, 'TestAccount');
                assert.equal(res.body.subgroup, testData.subgroup_id);
                done();
            });
    });

    it('POST /v1/chat : respond with status code 200 and send correct chats', function (done) {
        var chatroom = {
            chats: [],
            text: '',
            user_username: 'TestAccount',
            user_id: testData.user_id,
            subgroup: testData.subgroup_id,
            subgroup_title: 'TestSubGroup'
        };
        request(app)
            .post('/v1/chat')
            .set('Accept', 'application/json')
            .send(chatroom)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                assert.equal(res.body[0].text, 'test');
                assert.equal(res.body[0].user_id, testData.user_id);
                assert.equal(res.body[0].user_username, 'TestAccount');
                assert.equal(res.body[0].subgroup, testData.subgroup_id);
                done();
            });
    });

    it('/v1/chat/like : respond with status code 200 and check like', function (done) {
        var chat = {
            _id: testData.chat_id,
            liked: true
        };
        request(app)
            .post('/v1/chat/like')
            .set('Accept', 'application/json')
            .send(chat)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                console.log(res.body);
                assert.equal(res.status, 200);
                assert.equal(res.body._id, testData.chat_id);
                assert.equal(res.body.liked, !chat.liked);
                done();
            });
    });



    it('POST /v1/subgroup/leave : respond with status code 200', function (done) {
        var subgroup = {
            user: testData.user_id,
            _id: testData.subgroup_id
        };
        request(app)
            .post('/v1/subgroup/leave')
            .set('Accept', 'application/json')
            .send(subgroup)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });


    it('POST /v1/group/leave : respond with status code 200', function (done) {
        var group = {
            user: testData.user_id,
            _id: testData.group_id
        };
        request(app)
            .post('/v1/group/leave')
            .set('Accept', 'application/json')
            .send(group)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    /* Keep at bottom it deletes the test user ==================================== */
    it('POST /v1/user/delete : respond with status code 200 from delete user', function (done) {
        var user = {
            username: 'TestAccount'
        };
        request(app)
            .post('/v1/user/delete')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });
});






