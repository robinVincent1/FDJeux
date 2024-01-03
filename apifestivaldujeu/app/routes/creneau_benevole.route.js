const controller = require('../controllers/creneau_benevole.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.post('/', controller.inscription)

    router.delete('/', controller.desinscription)

    router.get('/:idCreneau',controller.getbenevoles)

    router.get('/:UserId',controller.getcreneaux)

    app.use('/creneau_benevole', router);
}   