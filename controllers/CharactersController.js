var Character = require('../models/character');

function charactersIndex(req, res){
  Character.find({}, function(err, characters){
    if (err) return res.status(404).json({ message: "Error while finding characters." });
    res.status(200).json({ characters: characters });
  });
}

function characterCreate(req, res){

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
 Character.findById(req.params.id, function(err, character){
    if (!character) return res.status(404).json({ message: "Character not found."});
    if (err) return res.status(500).json({ message: err });
    res.status(200).json({ character: character });
  });
}

function characterUpdate(req, res){
  Character.findById(req.params.id, function(err, character){
    if (!character) return res.status(404).json({ message: "Character not found."});
    if (err) return res.status(500).json({ message: err });
 
    character.String              = req.body.String              || character.String;
    character.kMandarin           = req.body.kMandarin           || character.kMandarin;
    character.kDefinition         = req.body.kDefinition         || character.kDefinition;
    character.kFrequency          = req.body.kFrequency          || character.kFrequency;
    character.kTraditionalVariant = req.body.kTraditionalVariant || character.kTraditionalVariant;

    character.save(function(err){
      if (err) return res.status(500).json({ message: err });
      res.status(200).json({ message: "Character successfully updated" });
    });

  });
}

function characterDestroy(req, res){
  Character.findByIdAndRemove({ _id: req.params.id }, function(err){
    if (err) return res.status(500).json({ message: err });
    res.status(200).json({ message: "Character successfully deleted." });
  });
}

// FOR SEEDING DATA ONLY:
function charactersCreateInBulk(req, res){

  var errorCount = 0;
  req.body.forEach(function(character){
    // console.log(i, character);
    var newCharacter = new Character({
      String              : character.String,
      kMandarin           : character.kMandarin,
      kDefinition         : character.kDefinition,
      kFrequency          : character.kFrequency,
      kTraditionalVariant : character.kTraditionalVariant
    });

    newCharacter.save(function(err){
      if (err) errorCount++;
    });
  });

  res.status(200).json({ message: "Characters added to database with " + errorCount + " errors."});
}

module.exports = {
  charactersIndex        : charactersIndex,
  characterShow          : characterShow,
  characterCreate        : characterCreate,
  characterUpdate        : characterUpdate,
  characterDestroy       : characterDestroy,
  charactersCreateInBulk : charactersCreateInBulk
}