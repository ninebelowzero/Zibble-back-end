var mongoose  = require('mongoose');

var CharacterSchema = mongoose.Schema({
  String              : { type: String },
  kMandarin           : { type: String },
  kDefinition         : { type: String },
  kFrequency          : String,
  kTraditionalVariant : String
});

module.exports = mongoose.model('Character', CharacterSchema);