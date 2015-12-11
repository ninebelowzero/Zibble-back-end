var request = require('request');

request
  .get('http://ccdb.hemiola.com/characters?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency,kDefinition,kTraditionalVariant')
  .on('response', function(response){
    console.log("============> Status code:", response.statusCode);
    console.log("============>  Content type:", response.headers['content-type'])
  })
  .pipe(request.post('http://localhost:3000/api/characters/bulk'));

// request('http://ccdb.hemiola.com/characters?filter=gb+!simplifiable&fields=String,kMandarin,kFrequency,kDefinition,kTraditionalVariant', function(error, response, body){
//   if (error) console.log("Error:", error);
//   if (!error && response.statusCode == 200){
//     console.log("==============================>", body);
//   }
//   return "Done.";
// });