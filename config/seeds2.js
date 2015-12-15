var request = require('request');
var config  = require("./config");
var Character = require('../models/character');
var mongoose  = require('mongoose');
mongoose.connect(config.database);
var errorCount = 0;

function saveCharacter(character){
  console.log("creating document for " + character.String + ", "+ character.kMandarin)
  var newCharacter = new Character({
    String              : character.String,
    kMandarin           : character.kMandarin,
    kDefinition         : character.kDefinition,
    kFrequency          : character.kFrequency,
    kTraditionalVariant : character.kTraditionalVariant
  });

  newCharacter.save(function(err){ if (err){ throw err } });
}

function importCharacters(){
  for(var i = 51; i <= 100; i++){
    
    var url = 'http://ccdb.hemiola.com/characters/radicals/' + i + '?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency, kDefinition,kTraditionalVariant'
    console.log(url)
    request(url, function (error, response, body) {
      console.log( 'request ' + i)
      if (!error && response.statusCode == 200) {
        var jsonObject = JSON.parse(body);
        jsonObject.forEach(function(character){
          saveCharacter(character)
        });
      } else {
        console.log(error)
        errorCount ++;
        console.log("response status = " + response.statusCode);
      }
      if(i == 100){
        console.log(errorCount + " errors happened for the whole import");
        process.exit();
      }
    });    
  }
}

Character.remove({}, function(err, result) {
  if(err) throw err;
  console.log("Dropped collection Character.... importing.");
  importCharacters();
});