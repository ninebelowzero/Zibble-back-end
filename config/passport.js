var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');
var jwt           = require('jsonwebtoken');

module.exports = function(passport){
  passport.use('local-signup', new LocalStrategy({
    usernameField     : 'username',
    passwordField     : 'password',
    passReqToCallback : true
  }, function(req, username, password, done){
    process.nextTick(function(){
      User.findOne({ 'username' : username }, function(err, user){

        if (err) return done(err);
        if (user) return done(null, false);

        var newUser      = new User();
        newUser.username = username;
        newUser.email    = req.body.email,
        newUser.password = newUser.password;

        newUser.save(function(err){
          if (err) return done(err);
          return done(null, newUser);
        });

      });
    });
  }));
}