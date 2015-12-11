var express          = require('express');
var app              = express();
var mongoose         = require('mongoose');
var ejs              = require('ejs');
var ejsLayouts       = require('express-ejs-layouts');
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
app.use(bodyParser.urlencoded({ extended: true }));

// Method-override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Routes
var router = require(__dirname + '/config/routes');
app.use('/api', router);

app.listen(process.env.PORT || 3000);
console.log("Listening on port: 3000");
