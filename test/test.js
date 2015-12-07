var assert = require('assert'),
    request = require('supertest'),
    server = require('../server');

var app = server.app;

describe('Meetle Test Suite', function() {

    var testData = {
        user_id: '',
        group_id: '',
        subgroup_id: ''
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
                assert.equal(res.body.username, 'TestAccount');
                assert.equal(res.body.first_name, 'Test');
                assert.equal(res.body.last_name, 'Account');
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
            .send(group)
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

    it('POST /v1/subgroup/group : respond with status code 200', function (done) {
        var subgroup = {
            user: testData.user_id,
            _id: testData.group_id
        };
        request(app)
            .post('/v1/subgroup/group')
            .set('Accept', 'application/json')
            .send(group)
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



    it('POST /v1/subgroup/leave : respond with status code 200', function (done) {
        var subgroup = {
            user: testData.user_id,
            _id: testData.subgroup_id
        };
        request(app)
            .post('/v1/subgroup/leave')
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
                assert.equal(res.body.title, 'TestSubGroup');
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
                testData.group_id = res.body._id;
                assert.equal(res.body.title, 'TestGroup');
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






