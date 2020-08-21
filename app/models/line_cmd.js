//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Line_cmd = sequelize.define("ligneCmd", {
      quantity: {
        type: Sequelize.INTEGER
      }

     
    });
  
    return Line_cmd;
  };