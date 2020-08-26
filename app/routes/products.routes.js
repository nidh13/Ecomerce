

module.exports = app => {
    const products = require("../controllers/product.controller");
    const upload = require("../middleware/multer");
  
    var router = require("express").Router();
  
    // Create a new category
    router.post("/new/:categoryId",upload.single('file'), products.add);
    router.get("/getByIdWithDetais/:id", products.getByIdWithDetais);
    router.put("/update/:id",upload.single('file'),products.update);
    router.delete("/delete/:id", products.delete);
    router.get("/getById/:id", products.getById);
    router.get("/getSponsorWithDetais", products.getSponsorWithDetais);
    router.get("/getAll", products.getAll);
    router.get("/getAllWithDetais", products.getAllWithDetais);
 

      
    app.use('/api/products', router);
  };