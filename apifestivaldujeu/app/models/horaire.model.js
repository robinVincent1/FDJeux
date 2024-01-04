

module.exports = (sequelize, Sequelize) => {
    const Horaire = sequelize.define('horaire', {
        idPlanning:{
            type: Sequelize.INTEGER,
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        heure_debut: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        heure_fin: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        jourId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });



    return Horaire;
};