const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const User = require('./user.model')(sequelize, Sequelize);
const Creneau = require('./creneau.model')(sequelize, Sequelize);
const Jour = require('./jour.model')(sequelize, Sequelize);
const PlanningGeneralLigne = require('./planning_general_ligne.model')(sequelize, Sequelize);
const PlanningGeneral = require('./planning_general.model')(sequelize, Sequelize);
const Infos = require("./infos.model")(sequelize, Sequelize);
const News = require("./news.model")(sequelize, Sequelize);
const Question = require("./question.model")(sequelize, Sequelize);
const Reponse = require("./reponse.model")(sequelize, Sequelize);

Question.hasMany(Reponse, { as: 'listeReponse', foreignKey: 'questionId' });
Reponse.belongsTo(Question, { foreignKey: 'questionId', onDelete: 'CASCADE' });


module.exports = {
  User,
  Creneau,
  Jour,
  PlanningGeneralLigne,
  PlanningGeneral,
  Infos,
  News,
  Question,
  Reponse
};
