//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Commande = sequelize.define("commandes", {
    date_cmd: {
       type : Sequelize.DATE  
   },
   montant_cmd: {
    type : Sequelize.FLOAT  
    },
    etat_cmd: {
        type : Sequelize.INTEGER  
        },
    modeLiv: {
         type : Sequelize.INTEGER  
            },
    modePay: {
        type : Sequelize.INTEGER  
    },
    

     
    });
  
    return Commande;
  };