const db = require('../models');

const Hebergement = db.hebergement;

// Créer un hebergement
exports.createHebergement = (req, res) => {
  const { createur, titre, description, adresse } = req.body;

  Hebergement.create({
    createur,
    titre,
    description,
    adresse,
  })
    .then((hebergement) => {
      res.status(201).json(hebergement);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Récupérer tous les hebergements
exports.getAllHebergements = (req, res) => {
  Hebergement.findAll()
    .then((hebergements) => {
      res.status(200).json(hebergements);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Récupérer un hebergement par ID
exports.getHebergementById = (req, res) => {
  const { id } = req.params;

  Hebergement.findByPk(id)
    .then((hebergement) => {
      if (!hebergement) {
        return res.status(404).json({ message: 'Hebergement non trouvé' });
      }
      res.status(200).json(hebergement);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Mettre à jour un hebergement par ID
exports.updateHebergement = (req, res) => {
  const { id } = req.params;

  const { createur, titre, description, adresse } = req.body;

  Hebergement.findByPk(id)
    .then((hebergement) => {
      if (!hebergement) {
        return res.status(404).json({ message: 'Hebergement non trouvé' });
      }

      hebergement.createur = createur;
      hebergement.titre = titre;
      hebergement.description = description;
      hebergement.adresse = adresse;

      return hebergement.save();
    })
    .then((updatedHebergement) => {
      res.status(200).json(updatedHebergement);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Supprimer un hebergement par ID
exports.deleteHebergement = (req, res) => {
  const { id } = req.params;

  Hebergement.findByPk(id)
    .then((hebergement) => {
      if (!hebergement) {
        return res.status(404).json({ message: 'Hebergement non trouvé' });
      }

      return hebergement.destroy();
    })
    .then(() => {
      res.status(204).json({ message: 'Hebergement supprimé avec succès' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
