const sequelize = require('../../db/conn');

module.exports = (sequelize, Sequelize) => {
    const Jour = sequelize.define('jour', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        list_horaire: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
            allowNull: false,
        },
    });

    return Jour;
};
