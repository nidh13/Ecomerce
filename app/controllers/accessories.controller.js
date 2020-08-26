const db = require("../models");
const Accessorie=db.accessories;
const Product = db.product;
module.exports = {


    add : function (req,res){

        //Parms
        productyId =req.params.productyId;
        name = req.body.name;
       
        Accessorie.create({
            name : name,
            productyId :productyId
        }).then(function(newAccessorie){
            return res.status(201).json(newAccessorie);

        }).catch(function(err){
            return res.status(500).json({ 'error': ' cant add Accessorie' });
        });


    },
    delete : function(req,res){

        const id = req.params.id;
  
        Accessorie.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Accessorie was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Accessorie with id=${id}. Maybe Accessorie was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Accessorie with id=" + id
            });
          });
    } ,update : function(req,res){
        const id = req.params.id;
  
        Accessorie.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Accessorie was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Accessorie with id=${id}. Maybe Accessorie was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Accessorie with id=" + id
            });
          });
    },
    deleteByProduct : function(req,res){

        productyId =req.params.productyId;

        Accessorie.destroy({
          where: { productyId: productyId }
     })
         .then(num => {
          if (num == 1) {
           res.send({
            message: "Accessories was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Accessorie . Maybe Accessories was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Accessories "
        });
      });
    },
     getAll : function(req,res){
   
        Accessorie.findAll()
        .then(function(data){
                    return res.status(201).json(data);
                }).catch(function(err){
                    return res.status(500).json({ 'error': 'unable to get Accessories' });
                });
      }, getById : function(req,res){
             //Parms
        var givenId =req.params.id;
        Accessorie.findOne({
            where: { id: givenId },
                }).then(function(data){
                    return res.status(201).json(data);
                }).catch(function(err){
                    return res.status(500).json({ 'error': 'unable to get Accessorie' });
                });
    },
    getAllByIdProduct : function(req,res){
      productyId =req.params.productyId;
  
      Accessorie.findAll({
        where: { productyId: productyId }
       })
       .then(function(data){
                   return res.status(201).json(data);
               }).catch(function(err){
                   return res.status(500).json({ 'error': 'unable to get Accessories' });
               });
     }
    






}