const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');


const defineReponse = (sequelize, Sequelize) => {


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

  return Reponse;
};

module.exports = defineReponse;
