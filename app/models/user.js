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
       
      adress: {
        type: Sequelize.STRING 
      },
      isAdmin: {
        type: Sequelize.INTEGER, defaultValue: 1
      },
     
    });
  
    return User;
  };