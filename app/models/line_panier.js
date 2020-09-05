//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Line_panier = sequelize.define("lignepanier", {
      quantity: {
        type: Sequelize.INTEGER,defaultValue: 0
      }

     
    });
  
    return Line_panier;
  };


  