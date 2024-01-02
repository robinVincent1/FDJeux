const controller = require('../controllers/festival.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.get('/', controller.getAllFestivals);

    router.get('/enCours', controller.getFestivalByEnCours);
    
    router.post('/',  controller.createFestival);
    
    router.put('/:id',  controller.incrementer);

    router.put('/modifRoleUser/:idFestival',  controller.ModifRoleUser);
    
    
    app.use('/festival', router);
    }
    