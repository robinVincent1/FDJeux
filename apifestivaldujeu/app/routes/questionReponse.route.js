const express = require('express');
const router = express.Router();
const qrController = require('../controllers/QuestionReponse.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  // Route pour créer une question
  router.post('/', qrController.createQuestion);

  // Route pour ajouter des réponses à une question existante
  router.post('/reponse/:id', qrController.addReponsesToQuestion);

  // Route pour supprimer une question et ses réponses associées
  router.delete('/questions/:id', qrController.deleteQuestionWithReponses);

  // Route pour supprimer uniquement une réponse
  router.delete('/reponses/:id', qrController.deleteReponse);

  // Route pour récupérer toutes les questions avec réponses associées
  router.get('/', qrController.getAllQuestionsWithReponses);


  app.use('/qr', router);
};
