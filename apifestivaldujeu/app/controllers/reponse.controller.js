const bcrypt = require('bcrypt');
const { Reponse } = require('../models');

// Méthode pour obtenir une réponse par son ID
getByIdR = async (req, res) => {
    try {
        const reponseId = req.params.id;
        const reponse = await Reponse.findOne({
            where: {
                idReponse: reponseId,
            },
        });

        if (!reponse) {
            return res.status(404).json({ error: 'Reponse not found' });
        }

        res.status(200).json(reponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching reponse by ID' });
    }
},

    // Méthode pour obtenir toutes les réponses
    getAllR = async (req, res) => {
        try {
            const allReponses = await Reponse.findAll();

            res.status(200).json(allReponses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching all reponses' });
        }
    },

    // Méthode pour mettre à jour une réponse
    updateR = async (req, res) => {
        try {
            const reponseId = req.params.id;
            const { createur, reponse } = req.body;

            // Vérifier si la réponse existe
            const existingReponse = await Reponse.findByPk(reponseId);
            if (!existingReponse) {
                return res.status(404).json({ error: 'Reponse not found' });
            }

            // Mettre à jour les champs de la réponse
            existingReponse.createur = createur;
            existingReponse.reponse = reponse;

            // Enregistrer les modifications
            await existingReponse.save();

            res.status(200).json(existingReponse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating reponse' });
        }
    },

    // Méthode pour supprimer une réponse
    deleteR = async (req, res) => {
        try {
            const reponseId = req.params.id;

            // Vérifier si la réponse existe
            const existingReponse = await Reponse.findByPk(reponseId);
            if (!existingReponse) {
                return res.status(404).json({ error: 'Reponse not found' });
            }

            // Supprimer la réponse
            await existingReponse.destroy();

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting reponse' });
        }
    },

    // Méthode pour créer une nouvelle réponse
    createR = async (req, res) => {
        try {
            const { createur, reponse } = req.body;

            // Créer la réponse
            const newReponse = await Reponse.create({
                createur,
                reponse,
            });

            res.status(201).json(newReponse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating reponse' });
        }
    },


    module.exports = { getByIdR, getAllR, deleteR, updateR, createR };
