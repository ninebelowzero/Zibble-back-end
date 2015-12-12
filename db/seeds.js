var request = require('request');

for(var i = 1; i <= 214; i++){

  request
    .get('http://ccdb.hemiola.com/characters/radicals/' + i + '?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency, kDefinition,kTraditionalVariant')
    .on('response', function(response){
      console.log("Getting characters for radical " + i + ". Status code: " + response.statusCode);
    })
    .pipe(request.post('http://localhost:3000/api/characters/bulk'));

}

// FULL SET (TOO LARGE FOR LOCAL API TO ACCEPT)
// request
//  .get('http://ccdb.hemiola.com/characters?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency,kDefinition,kTraditionalVariant')
