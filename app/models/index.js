const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.category = require("./category.js")(sequelize, Sequelize);
db.line_panier = require("./line_panier")(sequelize, Sequelize);
db.commande = require("./commande")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.panier = require("./panier")(sequelize, Sequelize);
db.accessories = require("./accessories")(sequelize, Sequelize);
db.description = require("./description")(sequelize, Sequelize);
db.feature = require("./feature")(sequelize, Sequelize);



///
db.category.hasMany(db.product, { as: "products" });
db.product.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
});

db.product.hasMany(db.accessories, { as: "accessories" });
db.accessories.belongsTo(db.product, {
  foreignKey: "productId",
  as: "product",
});
db.product.hasMany(db.description, { as: "descriptions" });
db.description.belongsTo(db.product, {
  foreignKey: "productId",
  as: "product",
});
db.product.hasMany(db.feature, { as: "features" });
db.feature.belongsTo(db.product, {
  foreignKey: "productId",
  as: "product",
});

//user panier
db.user.hasMany(db.panier,{as : "paniers"});
db.panier.belongsTo(db.user,{
  foreignKey: "userId",
  as : "user",
});

// more methodes panier product

db.panier.belongsToMany(db.product, { through: db.line_panier });
db.product.belongsToMany(db.panier, { through: db.line_panier });

//panier lign_panier
db.panier.hasMany(db.line_panier,{as : "line_paniers"});
db.line_panier.belongsTo(db.panier,{
  foreignKey: "panierId",
  as : "panier"
});
db.line_panier.belongsTo(db.panier,{
  foreignKey: "panier_uuid",
 targetKey : 'uuid' ,
});
//prodcut lign_panier
db.product.hasMany(db.line_panier,{ as :"line_paniers"});
db.line_panier.belongsTo(db.product,{
  foreignKey : "productId",
  as : "product"
});








module.exports = db;
