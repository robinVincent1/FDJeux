
module.exports = (sequelize, Sequelize) => {
    const Festival = sequelize.define('festival', {
      idFestival:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
      },
      nom: {
          type:Sequelize.STRING,
      },
      date: {
          type:Sequelize.STRING,
      },
      nbReferent: {
          type:Sequelize.INTEGER,
      },
      nbRespoSoiree: {
        type:Sequelize.INTEGER,
    },
    nbAccueilBenevole: {
        type:Sequelize.INTEGER,
    },
    nbBenevole: {
        type:Sequelize.INTEGER,
    },
    enCours: {
        type:Sequelize.BOOLEAN,
    },
    idPlanning: {
        type: Sequelize.STRING,
    }
  });
  
    return Festival;
  };