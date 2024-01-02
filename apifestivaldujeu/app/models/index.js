const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const User = require('./user.model')(sequelize, Sequelize);
const Creneaux = require('./creneau.model')(sequelize, Sequelize);
const Jour = require('./jour.model')(sequelize, Sequelize);
const PlanningGeneralLigne = require('./planning_general_ligne.model')(sequelize, Sequelize);
const PlanningGeneral = require('./planning_general.model')(sequelize, Sequelize);
const Horaire = require('./horaire.model')(sequelize, Sequelize);
const Infos = require("./infos.model")(sequelize, Sequelize);
const News = require("./news.model")(sequelize, Sequelize);
const Question = require("./question.model")(sequelize, Sequelize);
const Reponse = require("./reponse.model")(sequelize, Sequelize);
const Hebergement = require('./hebergement.model')(sequelize, Sequelize);
const Festival = require("./festival.model")(sequelize, Sequelize);

module.exports = {
  User,
  Creneaux,
  Jour,
  PlanningGeneralLigne,
  PlanningGeneral,
  Horaire,
  Infos,
  News,
  Question,
  Reponse,
  Hebergement,
  Festival,

};
