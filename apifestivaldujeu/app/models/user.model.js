const bcrypt = require('bcrypt');
const sequelize = require('../../db/conn');
const Sequelize = require('sequelize');
const CreneauBenevole = require('./creneau_benevole.model')(sequelize,Sequelize);

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    idUser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: Sequelize.DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nbEdition: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pseudo: {
      type: Sequelize.STRING,
    },
    postalAdress: {
      type: Sequelize.STRING,
    },
    propo: {
      type: Sequelize.STRING,
    },
    association: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
    photoProfil: {
      type: Sequelize.STRING,
    },
  });


  User.beforeCreate(async user => {
    user.active = false;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    return (user.password = hash);
  },{timestamps: false});

  return User;
};
