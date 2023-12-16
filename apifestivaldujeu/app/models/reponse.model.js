const bcrypt = require('bcrypt');
const sequelize = require('../../db/conn');

module.exports = (sequelize, Sequelize) => {
  const Reponse = sequelize.define('reponse', {
    idReponse:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    },
    createur: {
        type:Sequelize.USER,
    },
    reponse: {
        type:Sequelize.String,
    }
});


  return Reponse;
};