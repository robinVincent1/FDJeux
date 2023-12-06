const controller = require('../controllers/user.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  const router = require('express').Router();

  router.get('/me', isLoggedIn, controller.getMe);

  router.get('/:id', isLoggedIn, controller.getById);

  router.post('/login', controller.login);

  router.post('/', controller.create);

  // router.put('/', controller.update);

  // router.delete('/:id', controller.deleteById);

  app.use('/user', router);
};
