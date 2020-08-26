const description = require("../models/description");

module.exports = app => {
    const descriptions = require("../controllers/description.controller");
  
    var router = require("express").Router();


     router.post("/new", descriptions.add);
     router.get("/all", descriptions.getAll);
     router.get("/getById/:id", descriptions.getById);
     router.delete("/delete/:id", descriptions.delete);
     router.delete("/deleteByProduct/:productyId", descriptions.deleteByProduct);
     router.put("/update/:id", descriptions.update);
     router.get("/getAllByIdProduct/:productyId", descriptions.getAllByIdProduct);
   
  
  

  
    app.use('/api/descriptions', router);
  };