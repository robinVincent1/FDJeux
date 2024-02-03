
const controller = require('../controllers/jour.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();


    router.get('/:idPlanning', isLoggedIn, controller.getAllJour);

    router.get('/:id',controller.getJourById)

    router.put('/:id', isLoggedIn, controller.modifyJour);  
    
    router.post('/', isLoggedIn, controller.create);

    router.delete('/:id', isLoggedIn, controller.deleteById);
    
    app.use('/jours', router);
    }
