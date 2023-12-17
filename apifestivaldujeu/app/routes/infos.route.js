const express = require('express');
const router = express.Router();
const infosController = require('../controllers/infos.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  router.post('/', infosController.createInfo);
  
  router.get('/',  infosController.getAllInfos);

  router.get('/:id', infosController.getInfoById);

  router.put('/:id', isLoggedIn, isAdmin, infosController.updateInfo);

  router.delete('/:id',  infosController.deleteInfo);

  app.use('/infos', router);
};
