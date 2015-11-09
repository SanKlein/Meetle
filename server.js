var port = 3000;

var express = require('express'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  bodyParser = require('body-parser');

var app = express();

var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);

app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));

require('./server/routes')(app);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
