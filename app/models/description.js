//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Description = sequelize.define("descriptions", {
      name: {
        type: Sequelize.STRING , allowNull: false
      },
      value: {
        type: Sequelize.STRING , allowNull: false
      }

     
    });
  
    return Description;
  };