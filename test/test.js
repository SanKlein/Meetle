var assert = require('assert'),
    request = require('supertest'),
    server = require('../server');

var app = server.app;

describe('Meetle Test Suite', function() {

    var testData = {
        user_id: '',
        user_id2: '',
        group_id: '',
        subgroup_id: '',
        meetup_id: '',
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
                assert.equal(res.body[0].username, 'TestAccount');
                assert.equal(res.body[0].first_name, 'Test');
                assert.equal(res.body[0].last_name, 'Account');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('PUT /v1/user : respond with status code 200', function(done) {
        var newUserInfo = {
            '_id': testData.user_id,
            'username': 'TestAccount',
            'first_name' : 'Updated',
            'last_name': 'Updated'
        };
        request(app)
            .put('/v1/user')
            .set('Accept', 'application/json')
            .send(newUserInfo)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                console.log(res.body);
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

    it('PUT /v1/group/name : respond with status code 200', function (done) {
        var updatedGroupInfo = {
            _id: testData.group_id,
            title: 'Updated Group Name'
        };
        request(app)
            .put('/v1/group/name')
            .set('Accept', 'application/json')
            .send(updatedGroupInfo)
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

    it('PUT /v1/subgroup/name : respond with status code 200', function (done) {
        var updatedSubGroupInfo = {
            _id: testData.subgroup_id,
            title: 'Updated Subgroup Name'
        };
        request(app)
            .put('/v1/subgroup/name')
            .set('Accept', 'application/json')
            .send(updatedSubGroupInfo)
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

    it('POST /v1/user : respond with status code 200, check first_name, check last_name, check username', function(done) {
        var signupData = {
            'username': 'TestAccount2',
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
                console.log(res.body);
                testData.user_id2 = res.body._id;
                assert.equal(res.body.username, 'TestAccount2');
                assert.equal(res.body.first_name, 'Test');
                assert.equal(res.body.last_name, 'Account');
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/group : respond with status code 200, user not in group', function(done) {
        var user = {
            _id: testData.user_id2,
            group: testData.group_id
        };
        request(app)
            .post('/v1/user/group')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.body, false);
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/group : respond with status code 200, user in group', function(done) {
        var user = {
            _id: testData.user_id,
            group: testData.group_id
        };
        request(app)
            .post('/v1/user/group')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.body, true);
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/group/add : respond with status code 200', function(done) {
        var user = {
            _id: testData.user_id2,
            group: testData.group_id
        };
        request(app)
            .post('/v1/user/group/add')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/users/group : respond with status code 200', function(done) {
        var user = {
            _id: testData.group_id
        };
        request(app)
            .post('/v1/users/group')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/subgroup : respond with status code 200, user not in group', function(done) {
        var user = {
            _id: testData.user_id2,
            subgroup: testData.subgroup_id
        };
        request(app)
            .post('/v1/user/subgroup')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.body, false);
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/subgroup/add : respond with status code 200', function(done) {
        var user = {
            _id: testData.user_id2,
            subgroup: testData.subgroup_id
        };
        request(app)
            .post('/v1/user/subgroup/add')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/users/subgroup : respond with status code 200', function(done) {
        var user = {
            _id: testData.subgroup_id
        };
        request(app)
            .post('/v1/users/subgroup')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/subgroup/remove : respond with status code 200', function(done) {
        var user = {
            _id: testData.user_id2,
            subgroup: testData.subgroup_id
        };
        request(app)
            .post('/v1/user/subgroup/remove')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it('POST /v1/user/group/remove : respond with status code 200', function(done) {
        var user = {
            _id: testData.user_id2,
            group: testData.group_id
        };
        request(app)
            .post('/v1/user/group/remove')
            .set('Accept', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
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
                assert.equal(res.status, 200);
                assert.equal(res.body._id, testData.chat_id);
                assert.equal(res.body.liked, !chat.liked);
                done();
            });
    });

    it('POST /v1/meetup : respond with status code 200, check location, check subgroup', function (done) {
        var meetup = {
            subgroup_id: testData.subgroup_id,
            date: '1/1/2016',
            time: '1:00 PM',
            location: 'Rand'
        };
        request(app)
            .post('/v1/meetup')
            .set('Accept', 'application/json')
            .send(meetup)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                testData.meetup_id = res.body._id;
                assert.equal(res.body.location, 'Rand');
                assert.equal(res.body.subgroup, testData.subgroup_id);
                assert.equal(res.status, 200);
                done();
            });
    });

    it('PUT /v1/meetup : respond with status code 200', function (done) {
        var updatedMeetup = {
            _id: testData.meetup_id,
            date: 'Updated date',
            time: 'Updated time',
            location: 'Updated location'
        };
        request(app)
            .put('/v1/meetup')
            .set('Accept', 'application/json')
            .send(updatedMeetup)
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

    it('POST /v1/meetups : respond with status code 200', function (done) {
        var meetup = {
            _id: testData.subgroup_id
        };
        request(app)
            .post('/v1/meetups')
            .set('Accept', 'application/json')
            .send(meetup)
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

    it('POST /v1/meetup/delete : respond with status code 200', function (done) {
        var meetup = {
            _id: testData.meetup_id
        };
        request(app)
            .post('/v1/meetup/delete')
            .set('Accept', 'application/json')
            .send(meetup)
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
            username: 'TestAccount2'
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






