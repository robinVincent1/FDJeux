// creneau.model.js
const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const PlanningGeneralLigneModel = require('./planning_general_ligne.model')(sequelize, Sequelize);
const User = require('./user.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
  const Creneau = sequelize.define('creneau', {
    
    idCreneau: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPlanningGeneralLigne: {
      type: Sequelize.INTEGER,
    },
    ouvert: {
      type: Sequelize.BOOLEAN,
    },
    horaire: {
      type: Sequelize.STRING,
    },
    jour: {
      type: Sequelize.STRING,
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

  Creneau.belongsTo(PlanningGeneralLigneModel, { as: 'Creneaux' });
  Creneau.hasMany(User, { as: 'users' })

  return Creneau;
};


