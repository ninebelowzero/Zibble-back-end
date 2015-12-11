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

function characterShow(req, res){
  console.log("============================> In characterShow");

  Character.findById(req.params.id, function(err, character){
    if (err) return res.status(500).json({ message: err });
    if (!character) return res.status(404).json({ message: "Character not found."});
    return res.status(200).json({ character: character });
  });

}

module.exports = {
  charactersIndex : charactersIndex,
  characterShow   : characterShow,
  characterCreate : characterCreate
}