var express              = require('express');
var router               = express.Router();
var CharactersController = require('../controllers/CharactersController.js');

router.route('/api')
  .get(CharactersController.charactersIndex);

module.exports = router;