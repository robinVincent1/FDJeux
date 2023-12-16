const {Jour} = require('../models');

const create = async (req, res) => {
    try {
        const jour = await Jour.create(req.body);
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}

const getAllJour = async (req, res) => {
    try {
        const jour = await Jour.findAll();
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
}

const deleteById = async (req, res) => {
    try {
        const jour = await Jour.findOne({
        where: {
            idJour: req.params.id,
        },
        });
        if (!jour) throw new Error('Jour not found');
        await jour.destroy();
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: error.message });
    }
    }

    module.exports = {
        deleteById,
        create,
        getAllJour
    }