const bcrypt = require('bcrypt');
const sequelize = require('../../db/conn');

module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define('Question', {
    idQuestion:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    },
    createur: {
        type:Sequelize.USER,
    },
    objet: {
        type:Sequelize.String,
    },
    question: {
        type:Sequelize.String,
    },
    listeReponse: {
        type:Sequelize.ARRAY(Sequelize.Reponse),
    }
});


  return Question;
};