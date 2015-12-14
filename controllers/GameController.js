var Character = require('../models/character');

function getFirstBatch(req, res){
  // console.log("Getting first batch.");
  Character.find({ kFrequency: "1" }, function(err, characters){
    if (err) return res.status(404).json({ message: "Error while finding characters." });
    res.status(200).json({ characters: characters });
  });
} 

module.exports = {
  getFirstBatch : getFirstBatch
}