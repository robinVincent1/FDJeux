
const controller = require('../controllers/jour.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.get('/', isLoggedIn, controller.getAllJour);
    
    router.post('/', isLoggedIn, controller.create);

    router.delete('/:id', isLoggedIn, controller.deleteById);
    
    app.use('/jours', router);
    }
