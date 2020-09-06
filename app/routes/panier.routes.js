module.exports = app => {
    const paniers = require("../controllers/panier.controller");
  
    var router = require("express").Router();
  
    // Create a new category
    router.post("/new", paniers.add);
    router.get("/getById/:id", paniers.getbyId);
    router.get("/addProduct/:id",paniers.addProduct);
    router.get("/deleteProduct/:id",paniers.deleteProduct);
    

  
  
  

  
    app.use('/api/paniers', router);
  };