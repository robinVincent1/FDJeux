const express = require('express');
const router = express.Router();
const hebergementController = require('../controllers/hebergement.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  router.post('/',  hebergementController.createHebergement);
  
  router.get('/',  hebergementController.getAllHebergements);

  router.get('/:id', isLoggedIn, hebergementController.getHebergementById);

  router.put('/:id', isLoggedIn, isAdmin, hebergementController.updateHebergement);

  router.delete('/:id', hebergementController.deleteHebergement);

  app.use('/hebergement', router);
};
