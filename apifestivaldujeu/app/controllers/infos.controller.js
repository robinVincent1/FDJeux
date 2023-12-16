const db = require('../models');

const Infos = db.infos;

// Créer une information
exports.createInfo = (req, res) => {
  const { titre, description } = req.body;

  Infos.create({
    titre,
    description,
  })
    .then((info) => {
      res.status(201).json(info);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Récupérer toutes les informations
exports.getAllInfos = (req, res) => {
  Infos.findAll()
    .then((infos) => {
      res.status(200).json(infos);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Récupérer une information par ID
exports.getInfoById = (req, res) => {
  const { id } = req.params;

  Infos.findByPk(id)
    .then((info) => {
      if (!info) {
        return res.status(404).json({ message: 'Information non trouvée' });
      }
      res.status(200).json(info);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Mettre à jour une information par ID
exports.updateInfo = (req, res) => {
  const { id } = req.params;
  const { titre, description } = req.body;

  Infos.findByPk(id)
    .then((info) => {
      if (!info) {
        return res.status(404).json({ message: 'Information non trouvée' });
      }

      info.titre = titre;
      info.description = description;

      return info.save();
    })
    .then((updatedInfo) => {
      res.status(200).json(updatedInfo);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Supprimer une information par ID
exports.deleteInfo = (req, res) => {
  const { id } = req.params;

  Infos.findByPk(id)
    .then((info) => {
      if (!info) {
        return res.status(404).json({ message: 'Information non trouvée' });
      }

      return info.destroy();
    })
    .then(() => {
      res.status(204).json({ message: 'Information supprimée avec succès' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
