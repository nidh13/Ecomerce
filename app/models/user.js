//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
       email: {
          type : Sequelize.STRING , unique: true , allowNull: false
      },
      password: {
        type: Sequelize.STRING , allowNull: false
      },
      isAdmin: {
        type: Sequelize.INTEGER, defaultValue: 1
      },
      phone: {
        type: Sequelize.INTEGER
      },
      phone_two: {
        type: Sequelize.INTEGER
      },
      region: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.STRING
      },
       adress: {
        type: Sequelize.STRING 
      }
      
     
    });
  
    return User;
  };