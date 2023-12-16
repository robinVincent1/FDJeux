const {Horaire} = require('../models');

const addHoraire = async (req, res) => {
    try {
        const horaire = await Horaire.create(req.body);
        res.send(horaire);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}


const deleteById = async (req, res) => {
    try {
        const horaire = await Horaire.findOne({
        where: {
            idHoraire: req.params.id,
        },
        });
        if (!horaire) throw new Error('Horaire not found');
        await horaire.destroy();
        res.send(horaire);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
    }

    const modifyHeureDebut = async (req, res) => {
        try {
            const horaire = await Horaire.findOne({
            where: {
                idHoraire: req.params.id,
            },
            });
            if (!horaire) throw new Error('Horaire not found');
            await horaire.update({heure_debut:req.body.heure_debut});
            res.send(horaire);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }
    
    const modifyHeureFin = async (req, res) => {
        try {
            const horaire = await Horaire.findOne({
            where: {
                idHoraire: req.params.id,
            },
            });
            if (!horaire) throw new Error('Horaire not found');
            await horaire.update({heure_fin:req.body.heure_fin});
            res.send(horaire);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }
    
        module.exports = {
            deleteById,
            modifyHeureDebut,
            modifyHeureFin,
            addHoraire,
        }