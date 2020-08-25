//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      name: {
        type: Sequelize.STRING , allowNull: false
      },
      image: {
        type: Sequelize.STRING
      },
       marque: {
          type : Sequelize.STRING 
      },
      isInPromo: {
        type : Sequelize.INTEGER, defaultValue: 0
      },
      promoPercentage: {
        type: Sequelize.FLOAT , defaultValue: 0
      },
      stock: {
        type: Sequelize.INTEGER 
      },
      prix: {
        type: Sequelize.FLOAT 
      },
      prixPromotion: {
        type: Sequelize.FLOAT , defaultValue: 0
      },
      isSponsor: {
        type : Sequelize.INTEGER , defaultValue: 0
     }
     

     
    });
  
    return Product;
  };