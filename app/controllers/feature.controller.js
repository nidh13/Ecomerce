const db = require("../models");
const Feature=db.feature;
const Product = db.product;
module.exports = {


    add : function (req,res){

        //Parms
        productyId =req.params.productyId;
        name = req.body.name;
        value =req.file.value;
       
        Feature.create({
            name : name,
            value : value,
            productyId :productyId
        }).then(function(newFeature){
            return res.status(201).json(newFeature);

        }).catch(function(err){
            return res.status(500).json({ 'error': ' cant add feature' });
        });


    },
    delete : function(req,res){

        const id = req.params.id;
  
        Feature.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Feature was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Feature with id=${id}. Maybe Feature was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Feature with id=" + id
            });
          });
    } ,update : function(req,res){
        const id = req.params.id;
  
        Feature.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Feature was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Feature with id=${id}. Maybe Feature was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Feature with id=" + id
            });
          });
    },
    deleteByProduct : function(req,res){

        productyId =req.params.productyId;

        Feature.destroy({
          where: { productyId: productyId }
     })
         .then(num => {
          if (num == 1) {
           res.send({
            message: "Features was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Features . Maybe Features was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Features "
        });
      });
    },
     getAll : function(req,res){
   
        Feature.findAll()
        .then(function(data){
                    return res.status(201).json(data);
                }).catch(function(err){
                    return res.status(500).json({ 'error': 'unable to get features' });
                });
      }, getById : function(req,res){
             //Parms
        var givenId =req.params.id;
        Feature.findOne({
            where: { id: givenId },
                }).then(function(data){
                    return res.status(201).json(data);
                }).catch(function(err){
                    return res.status(500).json({ 'error': 'unable to get feature' });
                });
    },
    getAllByIdProduct : function(req,res){
      productyId =req.params.productyId;
  
       Feature.findAll({
        where: { productyId: productyId }
       })
       .then(function(data){
                   return res.status(201).json(data);
               }).catch(function(err){
                   return res.status(500).json({ 'error': 'unable to get features' });
               });
     }
    






}