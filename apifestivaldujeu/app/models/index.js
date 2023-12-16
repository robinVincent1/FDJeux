const Sequelize = require('sequelize');
const sequelize = require('../../db/conn');
const User = require('./user.model')(sequelize, Sequelize);
const Creneau = require('./creneau.model')(sequelize, Sequelize);


module.exports = {
  User,
  Creneau
};
