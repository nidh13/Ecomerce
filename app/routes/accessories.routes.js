module.exports = app => {
    const accessories = require("../controllers/accessories.controller");
  
    var router = require("express").Router();
 
     router.post("/new", accessories.add);
     router.get("/all", accessories.getAll);
     router.get("/getById/:id", accessories.getById);
     router.delete("/delete/:id", accessories.delete);
     router.delete("/deleteByProduct/:productyId", accessories.deleteByProduct);
     router.put("/update/:id", accessories.update);
     router.get("/getAllByIdProduct/:productyId", accessories.getAllByIdProduct);
   
  
  

  
    app.use('/api/accessories', router);
  };