var Character = require('../models/character');

function charactersIndex(req, res){

  console.log("============================> In charactersIndex");

  Character.find({}, function(err, characters){
    if (err) return res.status(404).json({ message: "Error while finding characters." });
    res.status(200).json({ characters: characters });
  });
}

function characterCreate(req, res){

  console.log("============================> In characterCreate");

  if (!req.body.String || !req.body.kMandarin || !req.body.kDefinition){
    return res.status(400).json({ message: "String, kMandarin, and kDefinition are required fields." });
  }

  var character = new Character({
    String              : req.body.String,
    kMandarin           : req.body.kMandarin,
    kDefinition         : req.body.kDefinition,
    kFrequency          : req.body.kFrequency,
    kTraditionalVariant : req.body.kTraditionalVariant
  });

  character.save(function(err){
    if (err) return res.status(200).json({ message: "Unable to save character." + err });
    res.status(201).json(character);
  });

}

module.exports = {
  charactersIndex : charactersIndex,
  characterCreate : characterCreate
}