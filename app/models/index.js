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
db.lineCmd = require("./line_cmd")(sequelize, Sequelize);
db.ordered = require("./ordered")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.basket = require("./basket")(sequelize, Sequelize);
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






module.exports = db;
