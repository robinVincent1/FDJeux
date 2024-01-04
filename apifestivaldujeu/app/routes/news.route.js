const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {

  router.get('/', isLoggedIn, newsController.getAllNews);

  router.get('/fav', isLoggedIn, newsController.getFavoriteNews)

  router.post('/',  isLoggedIn, newsController.createNews);

  router.put('/:id', isLoggedIn, newsController.updateNews);

  router.delete('/:id', isLoggedIn, newsController.deleteNews);

  app.use('/news', router);
};
