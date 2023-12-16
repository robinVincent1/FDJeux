
module.exports = (sequelize, Sequelize) => {
  const Infos = sequelize.define('infos', {
    idInfos:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    },
    titre: {
        type:Sequelize.String,
    },
    description: {
        type:Sequelize.String,
    },
});


  return Infos;
};