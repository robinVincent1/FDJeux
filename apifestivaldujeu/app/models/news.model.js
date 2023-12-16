const bcrypt = require('bcrypt');
const sequelize = require('../../db/conn');

module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define('news', {
    idNews:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    },
    createur: {
        type:Sequelize.USER,
    },
    titre: {
        type:Sequelize.String,
    },
    description: {
        type:Sequelize.String,
    },
    favori: {
        type:Sequelize.Boolean,
    }
});


  return News;
};