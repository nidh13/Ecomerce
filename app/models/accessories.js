//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Accessories = sequelize.define("accessories", {
      name: {
        type: Sequelize.STRING , allowNull: false
      }
     
    });
  
    return Accessories;
  };