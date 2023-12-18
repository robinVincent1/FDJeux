

module.exports = (sequelize, Sequelize) => {
  const Hebergement = sequelize.define('hebergement', {
    idHebergement:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    },
    createur: {
        type:Sequelize.STRING,
    },
    titre: {
        type:Sequelize.STRING,
    },
    description: {
        type:Sequelize.STRING,
    },
    adresse: {
        type:Sequelize.STRING,
    },
    communication : {
        type: Sequelize.STRING,
    }
});


  return Hebergement;
};