

module.exports = (sequelize, Sequelize) => {
  const Hebergement = sequelize.define('hebergement', {
    idHebergement:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    },
    createur: {
        type:Sequelize.USER,
    },
    titre: {
        type:Sequelize.String,
    },
    description: {
        type:Sequelize.String,
    },
    adresse: {
        type:Sequelize.String,
    }
});


  return Hebergement;
};