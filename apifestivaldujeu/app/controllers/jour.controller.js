const { Jour, Horaire } = require('../models');

const create = async (req, res) => {
  try {
    const jour = await Jour.create(req.body);
    res.status(201).json(jour);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Erreur lors de la création du jour', errors: error.errors });
  }
};

const getAllJour = async (req, res) => {
  try {
    const jours = await Jour.findAll();
    res.status(200).json(jours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des jours', errors: error.errors });
  }
};

const getJourById = async(req,res) => {
  try {
    const jour = await Jour.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!jour) {
      res.status(404).json({ message: 'Jour non trouvé' });
      return;
    }

    res.status(200).json(jour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du jour', errors: error.errors });
  }
}

const deleteById = async (req, res) => {
  try {
    const jour = await Jour.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!jour) {
      res.status(404).json({ message: 'Jour non trouvé' });
      return;
    }

    await jour.destroy();
    res.status(200).json(jour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du jour', errors: error.errors });
  }
};

module.exports = {
  deleteById,
  create,
  getAllJour,
  getJourById,
};
