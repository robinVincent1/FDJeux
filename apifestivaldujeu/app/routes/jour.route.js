const creneau = require('../controllers/creneau.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
    const router = require('express').Router();
    
    router.get('/',creneau.getAll);
    
    router.get('/:id',creneau.getById);
    
    router.post('/', creneau.create);
    
    router.put('/',creneau.update);
    
    router.delete('/:id', creneau.deleteById);
    
    app.use('/jours', router);
    }
