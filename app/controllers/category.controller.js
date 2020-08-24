const db = require("../models");
var jwtUtils = require("../middleware/jwt.utils");
const Category=db.category;


module.exports ={

    add : function(req,res){
        //Params
        name = req.body.name;
        if(name == null){
            return res.status(400).json({'error':'messing paramters'});
        }
        Category.findOne({
            attributes: ['name'],
            where: { name: name }
          }).then(function(categoryFound){
              if(!categoryFound){

                var newCategory = Category.create({
                    name : name
                }).then(function(newCategory){
                    return res.status(201).json(newCategory);
                }).catch(function(err){
                    return res.status(500).json({ 'error': ' cant add category' });
                })

              }else{
                return res.status(409).json({ 'error': 'category already exist ' });
              }
              
          }).catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify category' });
          });

    },

    getAll : function(req,res){

        Category.findAll()
        .then(function(data){
            return res.status(201).json(data);

        }).catch(function(err){
            return res.status(500).json({ 'error': 'unable to get categorys' });

        });

    },
    getByIdWithProduct : function(req,res){
        
        //Parms

        var givenId =req.params.id;
        Category.findOne({
            attributes: ['name'],
            where: { id: givenId },
            include: ["products"]
                }).then(function(data){
                    return res.status(201).json(data);
                }).catch(function(err){
                    return res.status(500).json({ 'error': 'unable to get category' });
                });
    },
    getAllWithProduct : function(req,res){
        Category.findAll({
            include: ["products"]
        })
        .then(function(data){
            return res.status(201).json(data);

        }).catch(function(err){
            return res.status(500).json({ 'error': 'unable to get categorys' });

        });

    },
    delete : function(req,res){

        const id = req.params.id;
  
        Category.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Category was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Category with id=" + id
            });
          });
    },
    update : function(req,res){
        const id = req.params.id;
  
        Category.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Category was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Category with id=" + id
            });
          });
    }
    
    

}