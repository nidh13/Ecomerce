//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Panier = sequelize.define("panier", {
      totale: {
        type: Sequelize.FLOAT ,defaultValue: 0
      },
      uuid : {
        type : Sequelize.STRING ,unique: true 

      }

     
    });
  
    return Panier;
  };