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

// FOR SEEDING DATA ONLY:
router.route('/characters/bulk')
  .post(CharactersController.charactersCreateInBulk);

module.exports = router;