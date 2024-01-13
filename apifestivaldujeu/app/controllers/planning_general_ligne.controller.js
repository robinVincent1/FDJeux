const { PlanningGeneralLigne } = require('../models');

const createLigne = async function (req, res) {
    try {
        const { titre, idPlanningGeneral } = req.body;
        const planningGeneralLigne = await PlanningGeneralLigne.create({
            titre: titre,
            idPlanningGeneral: idPlanningGeneral,
        });
        res.send(planningGeneralLigne);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};

const getAllLigne = async function (req, res) {
    try {
        const planningGeneralLigne = await PlanningGeneralLigne.findAll(
            {
                where: {
                    idPlanningGeneral: req.params.idPlanning,
                },
            }
        );
        res.send(planningGeneralLigne);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};

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

const modifytitre = async function(req,res){
    try{
        const planningGeneralLigne = await PlanningGeneralLigne.findOne({
            where: {
                idPlanningGeneralLigne: req.params.id,
            },
        });
        if (!planningGeneralLigne) throw new Error('PlanningGeneralLigne not found');
        await planningGeneralLigne.update({titre:req.body.titre});
        res.send(planningGeneralLigne);
    }catch(error){
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}


module.exports = {
    deleteById,
    createLigne,
    getAllLigne,
    modifytitre
}