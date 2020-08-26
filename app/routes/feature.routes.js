module.exports = app => {
    const features = require("../controllers/feature.controller");
  
    var router = require("express").Router();
  
    // Create a new category
     router.post("/new", features.add);
     router.get("/all", features.getAll);
     router.get("/getById/:id", features.getById);
     router.delete("/delete/:id", features.delete);
     router.delete("/deleteByProduct/:productyId", features.deleteByProduct);
     router.put("/update/:id", features.update);
     router.get("/getAllByIdProduct/:productyId", features.getAllByIdProduct);
   
  
  

  
    app.use('/api/features', router);
  };