// horaire.model.js
const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Horaire = sequelize.define('horaire', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        heure_debut: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        heure_fin: {
            type: Sequelize.TIME,
            allowNull: false,
        },
    });

    return Horaire;
};