const controller = require('../controllers/creneau_benevole.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.post('/', isLoggedIn, controller.inscription)

    router.post('/:UserId', isLoggedIn, controller.inscriptionbyid)

    router.get('/:CreneauId', isLoggedIn, controller.getbenevoles)

    router.get('/:UserId', isLoggedIn, controller.getcreneaux)

    app.use('/creneau_benevole', router);
}