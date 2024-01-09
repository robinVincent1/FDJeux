const controller = require('../controllers/repas.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.post('/', isLoggedIn, controller.createRepas)

    router.get('/:idUser/:idFestival/:repas', isLoggedIn, controller.getRepasByUserRepas)

    router.get('/:repas', isLoggedIn, controller.getRepasByEtat)

    router.put('/:idRepas', isLoggedIn, controller.updateRepas)

    app.use('/repas', router);
}