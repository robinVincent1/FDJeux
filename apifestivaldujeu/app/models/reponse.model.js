const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');
const Question = require('./question.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
  const Reponse = sequelize.define('Reponse', {
    idReponse: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createur: {
      type: Sequelize.STRING,
    },
    reponse: {
      type: Sequelize.STRING,
    },
  });

  Reponse.belongsTo(Question, { as: "reponse" });

  return Reponse
}