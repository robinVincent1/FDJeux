const bcrypt = require('bcrypt');
const PlanningGeneralLigneModel = require('./PlanningGeneralLigne.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
  const Creneau = sequelize.define('creneau', {
    idCreneau: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ouvert:{
        type:Sequelize.BOOLEAN,
    },
    horaire: {
        type:Sequelize.STRING,
    },
    jour: {
        type:Sequelize.STRING,
    },
    titre: {
        type:Sequelize.STRING,
    },
    nb_max: {
        type:Sequelize.INTEGER,
    },
    nb_inscrit: {
        type:Sequelize.INTEGER
    },
    referent: {
        type:Sequelize.USER,
    }, 
   
  });

Creneau.belongsToMany(User, {as : 'Benevoles', through : 'CreneauBenevole'});
Creneau.belongsTo(PlanningGeneralLigneModel, { as: 'PlanningGeneralLigne' });

  return Creneau;
};
