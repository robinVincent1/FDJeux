const controller = require('../controllers/repas.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();

    router.post('/', controller.createRepas)

    router.get('/:idUser/:idFestival/:repas', controller.getRepasByUserRepas)

    router.get('/:repas', controller.getRepasByEtat)

    router.put('/:idRepas', controller.updateRepas)

    app.use('/repas', router);
}