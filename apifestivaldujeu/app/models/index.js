const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,

  pool: {
    max: parseInt(process.env.DB_POOL_MAX),
    min: parseInt(process.env.DB_POOL_MIN),
    acquire: parseInt(process.env.DB_ACQUIRE),
    idle: parseInt(process.env.DB_IDLE),
  },
});

const db = {};
db.users = require('./user.model')(sequelize, Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = {
  db,
  User : db.users,
};
