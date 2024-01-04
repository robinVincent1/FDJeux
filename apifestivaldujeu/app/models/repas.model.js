const defineUser = require("./user.model")

module.exports = (sequelize, Sequelize) => {
    const User = defineUser(sequelize, Sequelize)
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

    Repas.belongsTo(User, { as: "User", foreignKey: "idUser"})

    return Repas;
};
