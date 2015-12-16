var config  = require("./config");
var Character = require('../models/character');
var mongoose  = require('mongoose');
mongoose.connect(config.database);

Character.remove({}, function(err, result) {
  if(err) throw err;
  console.log("Dropped collection Character.");
});