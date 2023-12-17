const { Question, Reponse } = require('../models');

// Créer une question sans réponse
exports.createQuestion = async (req, res) => {
  try {
    const { createur, objet, question } = req.body;

    const newQuestion = await Question.create({ createur, objet, question });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la question' });
  }
};


// Ajouter de nouvelles réponses à une question existante
exports.addReponsesToQuestion = async (req, res) => {
  try {
    const { questionId, reponses } = req.body;

    // Vérifier si la question existe
    const existingQuestion = await Question.findByPk(questionId);
    if (!existingQuestion) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }

    // Créer les nouvelles réponses associées à la question
    const nouvellesReponses = await Reponse.bulkCreate(
      reponses.map((reponse) => ({ ...reponse, questionId }))
    );

    res.status(201).json(nouvellesReponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de réponses à la question' });
  }
};


// Ajouter de nouvelles réponses à une question existante
exports.addReponsesToQuestion = async (req, res) => {
  try {
    const { questionId, reponses } = req.body;

    // Vérifier si la question existe
    const existingQuestion = await Question.findByPk(questionId);
    if (!existingQuestion) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }

    // Créer les nouvelles réponses associées à la question
    const nouvellesReponses = await Reponse.bulkCreate(
      reponses.map((reponse) => ({ ...reponse, questionId }))
    );

    res.status(201).json(nouvellesReponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de réponses à la question' });
  }
};

// Supprimer une question et ses réponses associées
exports.deleteQuestionWithReponses = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la question existe
    const existingQuestion = await Question.findByPk(id, {
      include: [{ model: Reponse, as: 'reponses' }],
    });

    if (!existingQuestion) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }

    // Supprimer la question et ses réponses associées
    await existingQuestion.destroy();

    res.status(204).json({ message: 'Question et réponses associées supprimées avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la question' });
  }
};


// Supprimer uniquement une réponse
exports.deleteReponse = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la réponse existe
    const existingReponse = await Reponse.findByPk(id);

    if (!existingReponse) {
      return res.status(404).json({ error: 'Réponse non trouvée' });
    }

    // Supprimer uniquement la réponse
    await existingReponse.destroy();

    res.status(204).json({ message: 'Réponse supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la réponse' });
  }
};


// Récupérer toutes les questions avec leurs réponses associées
exports.getAllQuestionsWithReponses = async (req, res) => {
  try {
    // Utiliser la méthode findAll avec include pour récupérer également les réponses
    const questionsWithReponses = await Question.findAll({
      include: [{ model: Reponse, as: 'reponses' }],
    });

    res.status(200).json(questionsWithReponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des questions avec réponses' });
  }
};
