module.exports = app => {
    const categorys = require("../controllers/category.controller");
  
    var router = require("express").Router();
  
    // Create a new category
    router.post("/new", categorys.add);
    router.get("/all", categorys.getAll);
    router.get("/ByIdWithProduct/:id", categorys.getByIdWithProduct);
    router.get("/AllWithProduct", categorys.getAllWithProduct);
     router.delete("/delete/:id", categorys.delete);
     router.put("/update/:id", categorys.update);
  
  
  

  
    app.use('/api/categorys', router);
  };