module.exports = (app) => {
  const paniers = require('../controllers/panier.controller');

  var router = require('express').Router();

  // Create a new category
  router.post('/new', paniers.add);
  router.get('/getById/:id', paniers.getbyId);
  router.get('/addProduct/:id', paniers.addProduct);
  router.get('/deleteProduct/:id', paniers.deleteProduct);
  router.get('/getPanierWithProduct', paniers.getPanierWithProduct);
  router.get('/getUserHist', paniers.commandeHist);
  //list to the admin
  router.get('/comandesNoLiv', paniers.demandescommandes);
  router.get('/confiermCommande', paniers.confirmCommande);
  router.get('/confirmLiv/:id', paniers.confirmLiv);

  app.use('/api/paniers', router);
};
