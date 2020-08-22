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
        type : Sequelize.INTEGER
      },
      promoPercentage: {
        type: Sequelize.FLOAT 
      },
      stock: {
        type: Sequelize.INTEGER 
      },
      prix: {
        type: Sequelize.FLOAT 
      },
      prixPromotion: {
        type: Sequelize.FLOAT 
      },
      fornisseur: {
        type : Sequelize.STRING 
     }
     

     
    });
  
    return Product;
  };