var assert = require('assert'),
    request = require('supertest'),
    server = require('../server');

var app = server.app;

describe('POST /v1/user', function() {
    var response = '';
    var signupData = {
        'username': 'TestAccount',
        'first_name' : 'Test',
        'last_name': 'Account',
        'password1': 'password'
    };
    it('Signup user and respond with status code 200', function(done) {
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
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe('GET /v1/users', function() {
    var response = '';
    it('Respond with status code 200 from get all users', function (done) {
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
                console.log(res.body);
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe('POST /v1/user/login', function() {
    var response = '';
    var loginData = {
        'username': 'TestAccount',
        'password': 'password'
    };
    it('Respond with status code 200 from login', function (done) {
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
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe('POST /v1/user/load', function() {
    var response = '';
    var user = {
        username: 'TestAccount'
    };
    it('Respond with status code 200 from load user', function (done) {
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
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe('GET /v1/groups', function() {
    var response = '';
    it('Respond with status code 200 from get groups', function (done) {
        request(app)
            .get('/v1/groups/564bb816c47125145bf732ce')
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
});

describe('POST /v1/group', function() {
    var response = '';
    var group = {
        user_id: '564bb816c47125145bf732ce',
        title: 'TestGroup'
    };
    it('Respond with status code 200 from create group', function (done) {
        request(app)
            .post('/v1/group')
            .set('Accept', 'application/json')
            .send(group)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                console.log(group);
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Response: ' + res);
                }
                console.log(res.body);
                assert.equal(res.status, 200);
                done();
            });
    });
});






// Keep this as the last test since it deletes our test user
describe('POST /v1/user/delete', function() {
    var response = '';
    var user = {
        username: 'TestAccount'
    };
    it('Respond with status code 200 from delete user', function (done) {
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

