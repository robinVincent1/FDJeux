const { Festival } = require("../models");

// Créer un festival
exports.createFestival = (req, res) => {
    const { nom, date, enCours } = req.body;
  
    Festival.create({
      nom,
      date,
      nbReferent: 0,
      nbRespoSoiree: 0,
      nbAccueilBenevole: 0,
      nbBenevole: 0,
      enCours,
      idPlanning: "",
    })
      .then((festival) => {
        res.status(201).json(festival);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };
  
  // Récupérer tous les festivals
  exports.getAllFestivals = (req, res) => {
    Festival.findAll()
      .then((festival) => {
        res.status(200).json(festival);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };

  exports.getFestivalByEnCours = async (req, res) => {
    try {
      const festival = await Festival.findOne({
        where: {
          enCours: true,
        },
      });
  
      if (festival) {
        res.status(200).json(festival);
      } else {
        res.status(404).json({ message: 'Aucun festival en cours trouvé' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };  


exports.incrementer = async (req, res) => {
  const { id, role } = req.body; 

  try {
    // Recherche du festival
    console.log(role)
    const festival = await Festival.findByPk(id);

    if (!festival) {
      return res.status(404).json({ error: 'Festival non trouvé' });
    }
    if (role == "référent") {
        await festival.increment({ 'nbReferent': 1 });
    }
    else if (role == "bénévole") {
        await festival.increment({ 'nbBenevole': 1 });
    }
    else if (role == "résponsable soirée") {
        await festival.increment({ 'nbRespoSoiree': 1 });
    }
    else if (role == "accueil bénévole") {
        await festival.increment({ 'nbBenevole': 1 });
    }
   

    res.status(200).json({ message: 'incrémentation réussie ' });
  } catch (error) {
    console.error('Erreur lors de l\'incrémentation', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


