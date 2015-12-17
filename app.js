var express          = require('express');
var expressJWT       = require('express-jwt');
var mongoose         = require('mongoose');
var morgan           = require('morgan');
var bodyParser       = require('body-parser');
var passport         = require('passport');
var app              = express();
var config           = require('./config/config');
var port             = process.env.PORT || 3000;
var cors             = require('cors');

// Connect to database
mongoose.connect(config.database);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors({
  origin: "http://localhost:8000"
}));

// Auth
require('./config/passport')(passport);
var secret = config.secret;
app
  .use('/users', expressJWT({ secret: config.secret }))
//  .unless({ path: ['/api/authorize', '/api/join'], method: 'post' });
app.use(function (error, request, response, next){
  if (error.name == 'UnauthorizedError'){
    response.status(401).json({ message: "You must have authorization to view this page" });
  }
});

// CORS

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(passport.initialize());

// Routes
var router = require(__dirname + '/config/routes');
app.use('/', router);

app.listen(port);
console.log("Listening on port:", port);
