const {Creneaux} = require('../models');

const createCreneau = async (req, res) => {
    try {
        const { referent, nb_max,nb_inscrit, ouvert, HoraireId, JourId,LigneId,heure_debut,heure_fin,titre } = req.body;
        const creneau = await Creneaux.create({
            referent: referent,
            nb_max: nb_max,
            ouvert: ouvert,
            HoraireId: HoraireId,
            JourId: JourId,
            LigneId: LigneId,
            heure_debut: heure_debut,
            heure_fin: heure_fin,
            titre: titre,
            nb_inscrit: nb_inscrit
        });
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
};

const getbyId = async (req, res) => {
    try {
        const creneau = await Creneaux.findOne({
            where: {
                HoraireId: req.params.HoraireId,
                JourId: req.params.JourId,
                LigneId: req.params.LigneId,
            },
        });
        if (!creneau) throw new Error('Creneau not found');
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}


const deleteById = async (req, res) => {
    try {
        const creneau = await Creneaux.findOne({
        where: {
            idCreneau: req.params.id,
        },
        });
        if (!creneau) throw new Error('Creneau not found');
        await creneau.destroy();
        res.send(creneau);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
    }

    const modifyReferent = async (req, res) => {
        try {
            const creneau = await Creneaux.findOne({
            where: {
                idCreneau: req.params.id,
            },
            });
            if (!creneau) throw new Error('Creneau not found');
            await creneau.update({referent:req.body.referent});
            res.send(creneau);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }
    
    const modifyNbMax = async (req, res) => {
        try {
            const creneau = await Creneaux.findOne({
            where: {
                idCreneau: req.params.id,
            },
            });
            if (!creneau) throw new Error('Creneau not found');
            await creneau.update({nb_max:req.body.nb_max});
            res.send(creneau);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }
    
    const modifyOuvert = async (req, res) => {
        try {
            const creneau = await Creneaux.findOne({
            where: {
                idCreneau: req.params.id,
            },
            });
            if (!creneau) throw new Error('Creneau not found');
            await creneau.update({ouvert:req.body.ouvert});
            res.send(creneau);
        } catch (error) {
            console.log(error);
            res.status(400).send({ errors: error.message });
        }
        }

    

    module.exports = {
        deleteById,
        modifyReferent,
        modifyNbMax,
        modifyOuvert,
        createCreneau,
        getbyId
    }