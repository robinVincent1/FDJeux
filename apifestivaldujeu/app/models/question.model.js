const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');
const defineReponse = require('./reponse.model');


const defineQuestion = (sequelize, Sequelize) => {
    const Reponse = defineReponse(sequelize, Sequelize);
    const Question = sequelize.define('Question', {
        idQuestion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        createur: {
            type: Sequelize.STRING,
        },
        objet: {
            type: Sequelize.STRING,
        },
        question: {
            type: Sequelize.STRING,
        },
    });
;
    Question.hasMany(Reponse, { as: 'listReponse', foreignKey: 'idReponse' });
    return Question
}

module.exports = defineQuestion