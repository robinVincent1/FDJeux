const bcrypt = require('bcrypt');
const { Question, Reponse } = require('../models'); // Assurez-vous que les modèles sont correctement importés


// Méthode pour créer une nouvelle question
create = async (req, res) => {
    try {
        const { createur, objet, question, listeReponse } = req.body;

        // Créer la question
        const newQuestion = await Question.create({
            createur,
            objet,
            question,
            listeReponse,
        });

        if (listeReponse && listeReponse.length > 0) {
            await Reponse.bulkCreate(listeReponse.map((reponse) => ({ ...reponse, questionId: newQuestion.idQuestion })));
        }

        res.status(201).json(newQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating question' });
    }
}

// Méthode pour obtenir une question par son ID
getById = async (req, res) => {
    try {
        const questionId = req.params.id;
        const question = await Question.findOne({
            where: {
                idQuestion: questionId,
            },
            include: [{ model: Reponse, as: 'listeReponse' }], // Inclure les réponses liées à la question
        });

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching question by ID' });
    }
}

// Méthode pour obtenir toutes les questions
getAll = async (req, res) => {
    try {
        const allQuestions = await Question.findAll({
            include: [{ model: Reponse, as: 'listeReponse' }], // Inclure les réponses liées à chaque question
        });

        res.status(200).json(allQuestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching all questions' });
    }
}

// Méthode pour mettre à jour une question
update = async (req, res) => {
    try {
        const questionId = req.params.id;
        const { createur, objet, question, listeReponse } = req.body;

        // Vérifier si la question existe
        const existingQuestion = await Question.findByPk(questionId);
        if (!existingQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Mettre à jour les champs de la question
        existingQuestion.createur = createur;
        existingQuestion.objet = objet;
        existingQuestion.question = question;
        existingQuestion.listeReponse = listeReponse;

        // Enregistrer les modifications
        await existingQuestion.save();

        res.status(200).json(existingQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating question' });
    }
}

// Méthode pour supprimer une question
deleteQ = async (req, res) => {
    try {
        const questionId = req.params.id;

        // Vérifier si la question existe
        const existingQuestion = await Question.findByPk(questionId);
        if (!existingQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Supprimer la question
        await existingQuestion.destroy();

        res.status(204).send(); // 204 No Content (success with no content)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting question' });
    }
}

module.exports = { getById, getAll, update, deleteQ, create };
