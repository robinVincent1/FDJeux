const controller = require('../controllers/creneau.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.get('/', isLoggedIn, controller.getAll);
    
    router.get('/:id', isLoggedIn, controller.getById);
    
    router.post('/', isLoggedIn, controller.create);
    
    router.put('/', isLoggedIn, controller.update);
    
    router.delete('/:id', isLoggedIn, controller.deleteById);
    
    app.use('/creneau', router);
    }
    