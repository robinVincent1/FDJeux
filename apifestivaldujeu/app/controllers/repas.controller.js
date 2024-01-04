// RepasController.js

const { Repas, User } = require("../models")

// Créer un repas
exports.createRepas = async (req, res) => {

    const repas = await Repas.create({
        idFestival: req.body.idFestival,
        repas: req.body.repas,
        etat: req.body.etat,
        idUser: req.body.idUser,
    })
        .then((repas) => {
            res.status(201).json(repas);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

exports.getRepasByUserRepas = async (req, res) => {
    const { idFestival, idUser, repas } = req.params;

    try {
        const repasFinded = await Repas.findOne({
            where: {
                idUser: idUser,
                repas: repas,
                idFestival: idFestival,
            },
            include: [{
                model: User,
                as: 'User',
            }],
        });

        if (repasFinded) {
            res.status(200).json(repasFinded);
        } else {
            res.status(404).json({ message: 'Aucun repas trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};



exports.getRepasByEtat = async (req, res) => {

    const { repas } = req.params;

    try {
        const repasFinded = await Repas.findAll({
            where: {
                etat: [1, 2],
                repas: repas
            },
            include: [{
                model: User,
                as: 'User',
            }],
        });

        if (repasFinded.length > 0) {
            res.status(200).json(repasFinded);
        } else {
            res.status(404).json({ message: 'Aucun repas trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};



exports.updateRepas = (req, res) => {
    const { idRepas } = req.params;

    const { etat } = req.body;

    Repas.findByPk(idRepas)
        .then((repas) => {
            if (!repas) {
                return res.status(404).json({ message: 'repas non trouvé' });
            }
            repas.etat = etat;

            return repas.save();
        })
        .then((updatedRepas) => {
            res.status(200).json(updatedRepas);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};