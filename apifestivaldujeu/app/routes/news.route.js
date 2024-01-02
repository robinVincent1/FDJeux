const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {

  router.get('/', newsController.getAllNews);

  router.get('/fav', newsController.getFavoriteNews)

  router.post('/',  newsController.createNews);

  router.put('/:id', newsController.updateNews);

  router.delete('/:id', newsController.deleteNews);

  app.use('/news', router);
};
