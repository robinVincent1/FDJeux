const sequelize = require('../../db/conn');

module.exports = (sequelize, Sequelize) => {
  const PlanningGeneralLigne = sequelize.define('planning_general_ligne', {
    idPlanningGeneralLigne: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPlanningGeneral: {
      type: Sequelize.INTEGER,
    },
    titre: {
      type: Sequelize.STRING,
    }
  });

  return PlanningGeneralLigne;
};
