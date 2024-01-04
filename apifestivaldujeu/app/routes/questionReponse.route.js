const express = require('express');
const router = express.Router();
const qrController = require('../controllers/QuestionReponse.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  // Route pour créer une question
  router.post('/', isLoggedIn, qrController.createQuestion);

  // Route pour ajouter des réponses à une question existante
  router.post('/:id', isLoggedIn, qrController.addReponsesToQuestion);

  // Route pour supprimer une question et ses réponses associées
  router.delete('/:id', isLoggedIn, qrController.deleteQuestionWithReponses);

  // Route pour supprimer uniquement une réponse
  router.delete('/reponse/:id', isLoggedIn, qrController.deleteReponse);

  // Route pour récupérer toutes les questions avec réponses associées
  router.get('/', isLoggedIn, qrController.getAllQuestionsWithReponses);

  app.use('/qr', router);
};
