const {CreneauBenevole} = require('../models');

const inscription = async (req,res) => {
    try{
        const{UserId,CreneauId} = req.body;
        const creneau_benevole = await CreneauBenevole.create({
            UserId: UserId,
            CreneauId: CreneauId
        });
        res.send(creneau_benevole);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}


const getbenevoles = async (req,res) => {
    try{
        const creneau_benevole = await CreneauBenevole.findAll({
            where: {
                CreneauId: req.params.CreneauId
            }
        });
        res.send(creneau_benevole);
    
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}
const getcreneaux = async (req,res) => {
    try{
        const creneau_benevole = await CreneauBenevole.findAll({
            where: {
                UserId: req.params.UserId
            }
        });
        res.send(creneau_benevole);
    }
    catch(error){
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

module.exports = {
    inscription,
    getbenevoles,
    getcreneaux
}