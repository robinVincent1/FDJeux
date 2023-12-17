
module.exports = (sequelize, Sequelize) => {
  const Infos = sequelize.define('Infos', {
    idInfos: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Infos;
};
