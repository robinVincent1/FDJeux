// creneau.model.js
const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const PlanningGeneralLigneModel = require('./planning_general_ligne.model')(sequelize, Sequelize);
const User = require('./user.model')(sequelize, Sequelize);
const CreneauBenevole = require('./creneau_benevole.model')(sequelize,Sequelize);

module.exports = (sequelize, Sequelize) => {
  const Creneaux = sequelize.define('creneaux', {
    
    idCreneau: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    LigneId: {
      type: Sequelize.INTEGER,
    },
    JourId: {
      type: Sequelize.INTEGER,
    },
    HoraireId: {
      type: Sequelize.INTEGER,
    },
    ouvert: {
      type: Sequelize.BOOLEAN,
    },
    heure_debut: {
      type: Sequelize.INTEGER,
    },
    heure_fin: {
      type: Sequelize.INTEGER,
    },
    titre: {
      type: Sequelize.STRING,
    },
    nb_max: {
      type: Sequelize.INTEGER,
    },
    nb_inscrit: {
      type: Sequelize.INTEGER
    },
    referent: {
      type: Sequelize.STRING,
    },
  }, {timestamps: false});

  Creneaux.belongsTo(PlanningGeneralLigneModel, { as: 'Creneaux' });

  return Creneaux;
};

