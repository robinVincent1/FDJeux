const { Question, Reponse } = require('../models');

// Créer une question sans réponse
const createQuestion = async (req, res) => {
  try {
    const { createur, objet, question } = req.body;

    const newQuestion = await Question.create({ createur, objet, question });

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la question' });
  }
};

// Ajouter une nouvelle réponse à une question existante
const addReponsesToQuestion = async (req, res) => {
  try {
    const { id } = req.params; // Assurez-vous que votre route contient un paramètre "id"
    const nouvelleReponse = req.body; // Le corps de la requête contient la nouvelle réponse

    // Vérifier si la question existe
    const existingQuestion = await Question.findByPk(id);
    if (!existingQuestion) {
      return res.status(404).json({ error: 'Question non trouvée' });
    }

    // Créer la nouvelle réponse associée à la question
    const nouvelleReponseCreee = await Reponse.create({
      ...nouvelleReponse,
      questionId: id,
    });

    res.status(201).json(nouvelleReponseCreee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la nouvelle réponse à la question" });
  }
};


// Supprimer une question et ses réponses associées
const deleteQuestionWithReponses = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la question existe
    const existingQuestion = await Question.findByPk(id, {
      include: [{ model: Reponse, as: 'idReponse' }],
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
const deleteReponse = async (req, res) => {
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
const getAllQuestionsWithReponses = async (req, res) => {
  try {
    // Utiliser la méthode findAll avec include pour récupérer également les réponses
    const questionsWithReponses = await Question.findAll({
      include: [{ model: Reponse, as: 'idReponse' }],
    });
    console.log(questionsWithReponses);
    res.status(200).json(questionsWithReponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des questions avec réponses' });
  }
};

module.exports = {
    createQuestion,
    getAllQuestionsWithReponses,
    deleteQuestionWithReponses,
    deleteReponse,
    addReponsesToQuestion,
}