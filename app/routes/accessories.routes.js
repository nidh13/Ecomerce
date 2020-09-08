module.exports = app => {
    const accessories = require("../controllers/accessories.controller");
  
    var router = require("express").Router();
 
     router.post("/new/:productId", accessories.add);
     router.get("/all", accessories.getAll);
     router.get("/getById/:id", accessories.getById);
     router.delete("/delete/:id", accessories.delete);
     router.delete("/deleteByProduct/:productId", accessories.deleteByProduct);
     router.put("/update/:id", accessories.update);
     router.get("/getAllByIdProduct/:productId", accessories.getAllByIdProduct);
   
  
  

  
    app.use('/api/accessories', router);
  };