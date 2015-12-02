var assert = require('assert'),
    //user = require('../server/routes/user'),
    //group = require('../server/routes/group'),
    //subgroup = require('../server/routes/subgroup'),
    //meetup = require('../server/routes/meetup'),
    //chat = require('../server/routes/chat'),
    request = require('supertest'),
    server = require('../server');

var app = server.app;

var signupData = {
    'username': 'TestAccount',
    'first_name' : 'Test',
    'last_name': 'Account',
    'password1': 'password'
};

describe('POST /v1/user', function() {
    var response = '';
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
                assert.equal(res.status, 403);
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
                assert.equal(res.status, 200);
                done();
            });
    });
});