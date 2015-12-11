var mongoose  = require('mongoose');

var CharacterSchema = mongoose.Schema({
  String              : { type: String, required: true },
  kMandarin           : { type: String, required: true },
  kDefinition         : { type: String, required: true },
  kFrequency          : String,
  kTraditionalVariant : String
});

module.exports = mongoose.model('Character', CharacterSchema);