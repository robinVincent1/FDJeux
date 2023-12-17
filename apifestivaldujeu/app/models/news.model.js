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
        type:Sequelize.STRING,
    },
    titre: {
        type:Sequelize.STRING,
    },
    description: {
        type:Sequelize.STRING,
    },
    favori: {
        type:Sequelize.BOOLEAN,
    }
});


  return News;
};