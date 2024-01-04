const controller = require('../controllers/festival.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.get('/', isLoggedIn, controller.getAllFestivals);

    router.get('/enCours', isLoggedIn, controller.getFestivalByEnCours);
    
    router.post('/', isLoggedIn, controller.createFestival);
    
    router.put('/:id', isLoggedIn, controller.incrementer);

    router.put('/modifRoleUser/:idFestival',  controller.ModifRoleUser);
    
    
    app.use('/festival', router);
    }
    