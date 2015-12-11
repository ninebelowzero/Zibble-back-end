var express              = require('express');
var router               = express.Router();
var CharactersController = require('../controllers/CharactersController.js');

router.route('/characters')
  .get(CharactersController.charactersIndex)
  .post(CharactersController.characterCreate);

router.route('/characters/:id')
  .get(CharactersController.characterShow)
  .put(CharactersController.characterUpdate)
  .delete(CharactersController.characterDestroy);

module.exports = router;