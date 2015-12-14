var Character = require('../models/character');

function show(req, res){
  Character.find({ kFrequency: req.params.id }, function(err, characters){
    if (err) return res.status(404).json({ message: "Error while finding characters for level " + req.params.id });
    res.status(200).json({ characters: characters });
  });
} 

module.exports = {
  show : show
}