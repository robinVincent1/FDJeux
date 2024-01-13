const {Horaire} = require('../models');


const create = async (req, res) => {
    try {
        console.log(req.body.jourId);
       const horaire = await Horaire.create({
        heure_debut : req.body.heure_debut,
        heure_fin : req.body.heure_fin,
        jourId : req.body.jourId,
        idPlanning : req.body.idPlanning
       });

        res.status(201).json(horaire);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Erreur lors de la création de l\'horaire', errors: error.errors });
    }
}

const getbyJourId = async (req, res) => {
    try {
        const horaires = await Horaire.findAll({
            where: {
                jourId: req.params.id,
                idPlanning: req.params.idPlanning
            },
        });
        res.status(200).json(horaires);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des horaires', errors: error.errors });
    }
};

const getAllHoraire = async (req, res) => {
    try {
        const horaires = await Horaire.findAll();
        res.status(200).json(horaires);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des horaires', errors: error.errors });
    }
};



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
            getbyJourId,
            modifyHeureDebut,
            modifyHeureFin,
            create,
            getAllHoraire,
        }