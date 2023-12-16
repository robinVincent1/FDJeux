const JourModel = require('./Jour.model')(sequelize, Sequelize);

module.exports = (sequelize, Sequelize) => {
    const PlanningGeneral = sequelize.define('planning_general', {
        idPlanning: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
    });
    PlanningGeneral.hasMany(JourModel, { as: 'jours' });
    return PlanningGeneral;
};
