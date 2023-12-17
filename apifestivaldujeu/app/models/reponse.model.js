// reponse.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');
const Question = require('./question.model');

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

Reponse.belongsTo(Question, { foreignKey: 'questionId', onDelete: 'CASCADE' });

return Reponse
}