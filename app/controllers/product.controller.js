const db = require("../models");
var jwtUtils = require("../middleware/jwt.utils");
const Category=db.category;
const Product = db.product;
const fs = require('fs');



module.exports = {


    add : function (req,res){

        //Parms
        categoryId =req.params.categoryId;
        name = req.body.name;
        image =req.file.filename;
        marque = req.body.marque;
        stock =req.body.stock;
        prix =req.body.prix;
      
      Product.create({
            name : name,
            image : image,
            marque :marque,
            stock : stock,
            prix : prix,
            prixPromotion : prix,
            categoryId :categoryId
        }).then(function(newProduct){
            return res.status(201).json(newProduct);

        }).catch(function(err){
            return res.status(500).json({ 'error': ' cant add product' });
        });


    },
    getByIdWithDetais : function(req,res){
        
        //Parms

        var givenId =req.params.id;
        Product.findOne({
            attributes: ['id','name','prix','marque','stock','image','isInPromo','prixPromotion','promoPercentage','isSponsor'],
            where: { id: givenId },
            include: ["features","accessories","descriptions"]
                }).then(function(data){
                    return res.status(201).json(data);
                }).catch(function(err){
                    return res.status(500).json({ 'error': 'unable to get product' });
                });
    },
    delete : function(req,res){

        const id = req.params.id;
  
        Product.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Product was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Product with id=" + id
            });
          });
    },
 
    update : function(req,res){
      

    //Parms
       var id = req.params.id;
       var name = req.body.name;
       var prix = req.body.prix;
       var marque = req.body.marque;
       var stock = req.body.stock;
       var image = req.file.filename;
       var isInPromo = req.body.isInPromo;
       var promoPercentage =req.body.promoPercentage;
       var isSponsor=req.body.isSponsor;
       var prixPromotion

      Product.findOne({
        attributes: ['id','name','prix','marque','stock','image','isInPromo','prixPromotion','promoPercentage','isSponsor'],
        where: { id: id }
     }).then(function(productFound){
          if(productFound){


            if(isInPromo == 1 && productFound.isInPromo == 0){

              prixPromotion = (prix * (100 -promoPercentage)) /100;


            }else if (isInPromo == 0 && productFound.isInPromo == 1){
              prixPromotion =prix;

            }



            productFound.update({
            name: (name ? name : productFound.name),
            prix: (prix ? prix : productFound.prix),
            marque: (marque ? marque : productFound.marque),
            stock: (stock ? stock : productFound.stock),
            image: (image ? image : productFound.image),
            isInPromo: (isInPromo ? isInPromo : productFound.isInPromo),
            prixPromotion: (prixPromotion ? prixPromotion : productFound.prixPromotion),
            promoPercentage: (promoPercentage ? promoPercentage : productFound.promoPercentage),
            isSponsor: (isSponsor ? isSponsor : productFound.isSponsor)
   
   
         }).then(function(productFound){
           return res.status(201).json(productFound)
         }
   
         ).catch(function(err){
           return res.status(500).json({ 'error': ' cant update product' });
         });
   
   
       }else{
         return res.status(404).json({ 'error': 'Product not found in db' });
   
       }
       
     }).catch(function(err){
       return res.status(500).json({ 'error': 'unable to verify product' })
     });
   
     }, getById : function(req,res){
        
      //Parms

      var givenId =req.params.id;
      Product.findOne({
          attributes: ['id','name','prix','marque','stock','image','isInPromo','prixPromotion','promoPercentage','isSponsor'],
          where: { id: givenId },
              }).then(function(data){
                  return res.status(201).json(data);
              }).catch(function(err){
                  return res.status(500).json({ 'error': 'unable to get product' });
              });
  }, getSponsorWithDetais : function(req,res){


    Product.findAll({
        attributes: ['id','name','prix','marque','stock','image','isInPromo','prixPromotion','promoPercentage','isSponsor'],
        where: { isSponsor : 1},
        include: ["features","accessories","descriptions"]
            }).then(function(data){
                return res.status(201).json(data);
            }).catch(function(err){
                return res.status(500).json({ 'error': 'unable to get product' });
            });
}, getAllWithDetais : function(req,res){


  Product.findAll({
      attributes: ['id','name','prix','marque','stock','image','isInPromo','prixPromotion','promoPercentage','isSponsor'],
          include: ["features","accessories","descriptions"]
          }).then(function(data){
              return res.status(201).json(data);
          }).catch(function(err){
              return res.status(500).json({ 'error': 'unable to get product' });
          });
}, getAll : function(req,res){


  Product.findAll({
      attributes: ['id','name','prix','marque','stock','image','isInPromo','prixPromotion','promoPercentage','isSponsor']
     
          }).then(function(data){
              return res.status(201).json(data);
          }).catch(function(err){
              return res.status(500).json({ 'error': 'unable to get product' });
          });
}
    


}