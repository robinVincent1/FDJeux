const {PlanningGeneral} = require('../models');

const createPlanning = async(req,res) => {
    try{
        const planning_general = await PlanningGeneral.create({
        });
        res.send(planning_general);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const getbyIdFestival = async(req,res) => {
    try{
        const planning_general = await PlanningGeneral.findOne({
            where: {
                idFestival: req.params.idFestival
            }
        });
        res.send(planning_general);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const AddIdFestival = async(req,res) => {
    try{
        const addidfestival = await PlanningGeneral.findOne({
            where : {
                idPlanning : req.params.PlanningId
            }
        });
        await addidfestival.update({idFestival:req.body.idFestival})
    }catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}


module.exports = {
    createPlanning,
    getbyIdFestival,
    AddIdFestival
}