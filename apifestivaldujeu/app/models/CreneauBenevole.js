const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const CreneauBenevole = sequelize.define('CreneauBenevole', {});

module.exports =  CreneauBenevole;