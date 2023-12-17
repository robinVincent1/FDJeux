const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');
const Reponse = require('./reponse.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
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

    Question.hasMany(Reponse, { as: 'listeReponse', foreignKey: 'questionId' });

    return Question
}
