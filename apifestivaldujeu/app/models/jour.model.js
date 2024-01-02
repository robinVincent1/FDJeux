const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');
const Horaire = require('./horaire.model')(sequelize, Sequelize);

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
    });

    Jour.hasMany(Horaire, { as: 'list_horaire', foreignKey: 'idJour' });

    return Jour;
};
