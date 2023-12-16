const controller = require('../controllers/horaire.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.get('/',  controller.getAllHoraire);
    
    router.get('/:id', controller.getByJourId);

    router.post('/', controller.create);
    
    router.put('/heuredebut', controller.modifyHeureDebut);

    router.put('/heurefin', controller.modifyHeureFin);
    
    router.delete('/:id', controller.deleteById);
    
    app.use('/horaire', router);
    }
