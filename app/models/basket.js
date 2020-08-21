//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Basket = sequelize.define("basket", {
      totale: {
        type: Sequelize.FLOAT 
      }

     
    });
  
    return Basket;
  };