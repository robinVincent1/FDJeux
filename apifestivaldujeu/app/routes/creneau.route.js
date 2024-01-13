const controller = require('../controllers/creneau.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.post('/', controller.createCreneau);

    router.get('/:JourId/:HoraireId/:LigneId/:idPlanning', isLoggedIn, controller.getbyId);

    router.put('/addnbinscrit/:idCreneau',controller.addnbinscrit)

    router.put('/modifyreferent/:idCreneau',controller.modifyReferent)

    router.put('/subnbinscrit/:idCreneau',controller.subtractnbinscrit)

    router.put('/modifynbmax/:idCreneau',controller.modifyNbMax)

    router.put('/modifyouvert/:idCreneau',controller.modifyOuvert)

    router.get('/getbyid/:idCreneau',controller.getCreneauById)

    router.get('/:JourId/:HoraireId/:LigneId', controller.getbyId);

    router.delete('/deletebyligne/:idligne', controller.deleteLigne);
    
    app.use('/creneau', router);
    }
    