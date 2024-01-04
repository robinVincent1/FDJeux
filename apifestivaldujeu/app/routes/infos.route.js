const express = require('express');
const router = express.Router();
const infosController = require('../controllers/infos.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  router.post('/', isLoggedIn, infosController.createInfo);
  
  router.get('/',  isLoggedIn, infosController.getAllInfos);

  router.get('/:id', isLoggedIn, infosController.getInfoById);

  router.put('/:id', isLoggedIn, isAdmin, infosController.updateInfo);

  router.delete('/:id',  isLoggedIn, infosController.deleteInfo);

  app.use('/infos', router);
};
