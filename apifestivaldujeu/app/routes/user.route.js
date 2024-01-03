const controller = require('../controllers/user.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  const router = require('express').Router();

  router.get('/me', isLoggedIn, controller.getMe);

  router.get('/:id',  controller.getById);

  router.get('/flexible/:idFestival', controller.getFlexibleFestival);

  router.get('/benevole/:idFestival',  controller.getBenevoleByFestival);

  router.get('/accueilBenevole/:idFestival',  controller.getAccueilBenevoleByFestival);

  router.get('/referent/:idFestival',  controller.getReferentsByFestival);

  router.get('/respoSoiree/:idFestival',  controller.getRespoSoireeByFestival);

  router.post('/login', controller.login);

  router.post('/', controller.create);

  router.put('/', controller.addFestivalToUser);

  router.put('/ModifProfil', controller.ModifProfil);

  router.put('/ModifRole/:idUser', controller.ModifRole);


  app.use('/user', router);
};
