const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const { User } = require('./user.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
    const Repas = sequelize.define('repas', {
        idRepas: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idFestival: {
            type: Sequelize.STRING,
        },
        repas: {
            type: Sequelize.INTEGER,
        },
        etat: {
            type: Sequelize.INTEGER,
        },
        idUser: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return Repas;
};
