var request = require('request');

for(var i = 1; i <= 214; i++){

  request
    .get('http://ccdb.hemiola.com/characters/radicals/' + i + '?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency, kDefinition,kTraditionalVariant')
    .on('response', function(response){
      console.log("Getting characters for radical " + i + ". Status code: " + response.statusCode);
    })
    .pipe(request.post('http://localhost:3000/characters/bulk'));

}

// FULL SET (TOO LARGE FOR LOCAL API TO ACCEPT?)
// request
//  .get('http://ccdb.hemiola.com/characters?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency,kDefinition,kTraditionalVariant')
//  .pipe(request.post('http://localhost:3000/characters/bulk'));

// var request = require('request');
// var config  = require("./config");
// var Character = require('../models/character');
// var mongoose  = require('mongoose');
// mongoose.connect(config.database);

// function importCharacters(){
//   for(var i = 1; i <= 1; i++){
//     console.log("In the loop: " + i); 
//     request
//       .get('http://ccdb.hemiola.com/characters/radicals/' + i + '?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency, kDefinition,kTraditionalVariant')
//       .pipe(request.post(config.host + '/characters/bulk'))
//       .on('response', function(response){
//         console.log("Status code: " + response.statusCode);
//       });
//   } 
// }



// Character.remove({}, function(err, result) {
//   if(err) throw err;
//   console.log("dropped collection Character.... going to import now !!");
//   importCharacters();
// });