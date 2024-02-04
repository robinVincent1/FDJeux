const csvController = require('../controllers/fileCsv.controller');
const { isLoggedIn } = require('../middleware/auth');

module.exports = app => {
  const router = require('express').Router();

  router.get('/get', isLoggedIn, csvController.getCsv);

  router.post('/post', isLoggedIn, csvController.importCsv);

  app.use('/csv', router);
};