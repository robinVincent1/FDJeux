// routes/questionReponse.route.js

const express = require('express');
const router = express.Router();
const qaController = require('../controllers/question.controller');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

module.exports = app => {
  // Route pour créer une question
  router.post('/', qaController.createQuestion);

  // Route pour ajouter des réponses à une question existante
  router.post('/:id/reponses', qaController.addReponsesToQuestion);

  // Route pour supprimer une question et ses réponses associées
  router.delete('/questions/:id', qaController.deleteQuestionWithReponses);

  // Route pour supprimer uniquement une réponse
  router.delete('/reponses/:id', qaController.deleteReponse);

  // Route pour récupérer toutes les questions avec réponses associées
  router.get('/', qaController.getAllQuestionsWithReponses);


  app.use('/qr', router);
};
