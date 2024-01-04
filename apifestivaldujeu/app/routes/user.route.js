const controller = require('../controllers/user.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  const router = require('express').Router();

  router.get('/me', isLoggedIn, controller.getMe);

  router.get('/:id', isLoggedIn, controller.getById);

  router.get('/benevole/:idFestival', isLoggedIn, controller.getBenevoleByFestival);

  router.get('/accueilBenevole/:idFestival', isLoggedIn, controller.getAccueilBenevoleByFestival);

  router.get('/referent/:idFestival', isLoggedIn, controller.getReferentsByFestival);

  router.get('/respoSoiree/:idFestival', isLoggedIn, controller.getRespoSoireeByFestival);

  router.post('/login', controller.login);

  router.post('/', controller.create);

  router.put('/', controller.addFestivalToUser);

  router.put('/ModifProfil', isLoggedIn, controller.ModifProfil);

  router.put('/ModifRole/:idUser', isLoggedIn, controller.ModifRole);


  app.use('/user', router);
};
