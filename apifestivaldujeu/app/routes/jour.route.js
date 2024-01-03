
const controller = require('../controllers/jour.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.get('/',controller.getAllJour);

    router.get('/:id',controller.getJourById)
    
    router.post('/', controller.create);

    router.delete('/:id', controller.deleteById);
    
    app.use('/jours', router);
    }
