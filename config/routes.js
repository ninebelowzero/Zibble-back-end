var express                  = require('express');
var router                   = express.Router();
var CharactersController     = require('../controllers/CharactersController.js');
var passport                 = require('passport');
var AuthenticationController = require('../controllers/AuthenticationController.js');
var UsersController          = require('../controllers/UsersController');
var LevelsController           = require('../controllers/LevelsController');

router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);

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

router.route('/levels/:id')
  .get(LevelsController.show);

module.exports = router;