//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Orderes = sequelize.define("ordered", {
    date_cmd: {
       type : Sequelize.DATE  
   },
   amount_cmd: {
    type : Sequelize.FLOAT  
    },
    state_cmd: {
        type : Sequelize.INTEGER  
        },
    delivery_mode: {
         type : Sequelize.INTEGER  
            },
    payment_mode: {
        type : Sequelize.INTEGER  
    },
    

     
    });
  
    return Orderes;
  };