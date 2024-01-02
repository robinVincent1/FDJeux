const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');


module.exports = (sequelize,Sequelize) => {
    const CreneauBenevole = sequelize.define('creneaubenevole',{
        idCreneauBenevole : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idUser : {
            type : Sequelize.INTEGER
        },
        idCreneau : {
            type : Sequelize.INTEGER
        }
    })

    return CreneauBenevole
}