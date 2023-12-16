const {PlanningGeneralLigne} = require('../models/planning_general_ligne.model.js');

const addPlanningGeneralLigne = async function (req, res) {
    try {
        const planningGeneralLigne = await PlanningGeneralLigne.create(req.body);
        res.send(planningGeneralLigne);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}

const deleteById = async function (req, res) {
    try{
        const planningGeneralLigne = await PlanningGeneralLigne.findOne({
            where: {
                idPlanningGeneralLigne: req.params.id,
            },
        });
        if (!planningGeneralLigne) throw new Error('PlanningGeneralLigne not found');
        await planningGeneralLigne.destroy();
        res.send(planningGeneralLigne);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}

const modifyTitre = async function (req, res) {
    try{
        const planningGeneralLigne = await PlanningGeneralLigne.findOne({
            where: {
                idPlanningGeneralLigne: req.params.id,
            },
        });
        if (!planningGeneralLigne) throw new Error('PlanningGeneralLigne not found');
        await planningGeneralLigne.update({titre:req.body.titre});
        res.send(planningGeneralLigne);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}

module.exports = {
    deleteById,
    addPlanningGeneralLigne,
    modifyTitre,
}