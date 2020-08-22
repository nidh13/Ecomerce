//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Feature = sequelize.define("features", {
      name: {
        type: Sequelize.STRING , allowNull: false
      },
      value: {
        type: Sequelize.STRING , allowNull: false
      }

     
    });
  
    return Feature;
  };