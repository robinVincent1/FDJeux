const { PlanningGeneralLigne } = require('../models');

const addLigne = async (req, res) => {
    try {
        const ligne = await PlanningGeneralLigne.create({
            titre: req.body.titre
        });
        res.send(ligne);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const modifyLigne = async (req, res) => {
    try {
        const ligne = await PlanningGeneralLigne.findOne({
            where: {
                idPlanningGeneralLigne: req.body.idPlanningGeneralLigne
            }
        });
        ligne.titre = req.body.titre;
        ligne.save();
        res.send(ligne);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const deleteLigne = async (req, res) => {
    try {
        const ligne = await PlanningGeneralLigne.findOne({
            where: {
                idPlanningGeneralLigne: req.body.idPlanningGeneralLigne
            }
        });
        ligne.destroy();
        res.send(ligne);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

module.exports = { addLigne, modifyLigne, deleteLigne };