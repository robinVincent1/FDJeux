const controller = require('../controllers/creneau.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.post('/', controller.createCreneau);

    router.get('/:JourId/:HoraireId/:LigneId', controller.getbyId);
    
    app.use('/creneau', router);
    }
    