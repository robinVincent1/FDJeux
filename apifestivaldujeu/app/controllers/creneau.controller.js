const {Creneau} = require('../models');

const deleteById = async (req, res) => {
    try {
        const creneau = await Creneau.findOne({
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
            const creneau = await Creneau.findOne({
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
            const creneau = await Creneau.findOne({
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
            const creneau = await Creneau.findOne({
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
        modifyOuvert
    }