//const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const Panier = sequelize.define("panier", {
      totale: {
        type: Sequelize.FLOAT ,defaultValue: 0
      },
      uuid : {
        type : Sequelize.STRING ,unique: true 

      },
      etat: {
        type : Sequelize.INTEGER  ,defaultValue: 0
        },
        modeLiv: {
          type : Sequelize.INTEGER  
             },
        modePay: {
          type : Sequelize.INTEGER  
     }, date_cmd: {
      type : Sequelize.DATE  
                  }

     
    });
  
    return Panier;
  };