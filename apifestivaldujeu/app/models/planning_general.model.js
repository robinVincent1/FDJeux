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
        
    });
    PlanningGeneral.hasMany(Jour, { as: 'jours' });
    return PlanningGeneral;
};
