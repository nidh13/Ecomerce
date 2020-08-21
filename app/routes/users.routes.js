module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/singUp", users.singUp);
  
    router.post("/login",users.login);
    router.get("/getUserById",users.getUserById);
    router.put("/updateProfile",users.updateProfile);
  

  
    app.use('/api/users', router);
  };