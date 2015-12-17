var User      = require('../models/user');
var jwt       = require('jsonwebtoken');
var passport  = require('passport');
var secret    = require('../config/config').secret;

function register(req, res, next){
  passport.authenticate('local-signup', function(err, user, info){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send({ error: "User already exists."});

    var token = jwt.sign(user, secret, { expiresInMinutes: 10080 });

    return res.status(200).send({
      success : true,
      message : "You have been successfully registered!",
      token   : token
    });

  })(req, res, next);
}

function login (req, res, next){
  console.log(req.body);
  User.findOne({
    username: req.body.username
  }, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send({ message: "Incorrect username or password." });
    if (!user.validPassword(req.body.password)) return res.status(401).send({ message: "Incorrect username or password."});

    var token = jwt.sign(user, secret, { expiresInMinutes: 10080 });

    return res.status(200).send({
      success: true,
      message: "Successfully signed in.",
      token  : token
    })

  });
}

module.exports = {
  register : register,
  login    : login
}