const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');
const Jour = require('./jour.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
    const PlanningGeneral = sequelize.define('planning_general', {
        idPlanning: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idFestival:{
            type: Sequelize.INTEGER,
        },
    });
    return PlanningGeneral;
};
