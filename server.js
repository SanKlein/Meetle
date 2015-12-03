var port = 3000;

var express           = require('express'),
    mongoose          = require('mongoose'),
    cookieParser      = require('cookie-parser'),
    methodOverride    = require('method-override'),
    session           = require('express-session'),
    logger            = require('morgan'),
    bodyParser        = require('body-parser'),
    io                = require('socket.io');

var app = express();

// mongoose.connect('mongodb://192.168.99.100:32770/meetledb');
mongoose.connect('mongodb://localhost/meetledb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));
app.use(logger('combined'));

require('./server/routes')(app);

app.use(session({
  secret: 'savingsessions',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2592000000 }
}));

app.listen(port, function() {
  console.log('Listening on port ' + port);
});