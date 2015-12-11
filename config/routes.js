var express              = require('express');
var router               = express.Router();
var CharactersController = require('../controllers/CharactersController.js');

router.route('/characters')
  .get(CharactersController.charactersIndex);

module.exports = router;