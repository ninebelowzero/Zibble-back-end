var express          = require('express');
var app              = express();
var mongoose         = require('mongoose');

// AUTHENTICATION PACKAGES
var passport         = require('passport');
var flash            = require('flash');
var cookieParser     = require('cookie-parser');
var session          = require('express-session');

// EJS - NOT NEEDED?
// var ejs              = require('ejs');
// var ejsLayouts       = require('express-ejs-layouts');

// MIDDLEWARE
var morgan           = require('morgan');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var path             = require('path');

var config           = require('./config/config');

// Mongoose
var MongoUri         = process.env.MONGOLAB_URI || 'mongodb://localhost/zibble';
mongoose.connect(MongoUri);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Authentication
app.use(cookieParser());
app.use(session({ secret: 'TO-BE-CONFIRMED' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Method-override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Globals
app.use(function(req, res, next){
  global.user = req.user;
  next();
})

// Routes
var router = require(__dirname + '/config/routes');
app.use('/api', router);

app.listen(process.env.PORT || 3000);
console.log("Listening on port: 3000");
