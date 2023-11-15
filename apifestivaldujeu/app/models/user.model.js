const bcrypt = require('bcrypt');

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
  });

  User.beforeCreate(async user => {
    user.active = false;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    return (user.password = hash);
  });

  User.belongsToMany(Creneau, {as : 'Creneaux', through : 'CreneauBenevole'});

  return User;
};
