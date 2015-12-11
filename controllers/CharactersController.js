var Character = require('../models/character');

function charactersIndex(req, res){
  Character.find({}, function(err, characters){
    if (err) return res.status(404).json({ message: "Error while finding characters." });
    res.status(200).json({ characters: characters });
  });
}

module.exports = {
  charactersIndex : charactersIndex
}