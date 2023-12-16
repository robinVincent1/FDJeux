const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    username : process.env.MYSQLUSER,
    password : process.env.MYSQLPASSWORD,
    database : process.env.MYSQLDATABASE,
    dialect : 'mysql',
    host : process.env.MYSQLHOST,
    port : process.env.MYSQLPORT
});

module.exports = sequelize;
