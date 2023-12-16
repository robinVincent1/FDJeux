const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const User = require('./user.model')(sequelize, Sequelize);
const Creneau = require('./creneau.model')(sequelize, Sequelize);
const Jour = require('./jour.model')(sequelize, Sequelize);
const PlanningGeneralLigne = require('./planning_general_ligne.model')(sequelize, Sequelize);
const PlanningGeneral = require('./planning_general.model')(sequelize, Sequelize);


module.exports = {
  User,
  Creneau,
  Jour,
  PlanningGeneralLigne,
  PlanningGeneral
};
