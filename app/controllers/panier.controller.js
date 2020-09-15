const db = require('../models');
const User = db.user;
var jwtUtils = require('../middleware/jwt.utils');
const Panier = db.panier;
const Product = db.product;
const Line_panier = db.line_panier;
var uuid = require('uuid');
var Sequelize = require('sequelize');
const { DATE } = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
  add: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    var uid = uuid.v4();

    if (userId < 0) return res.status(400).json({ error: 'wrong token' });
    Panier.count({
      where: { userId: userId },
    })
      .then(function (num) {
        if (num == 0) {
          var newPanier = Panier.create({
            userId: userId,
            uuid: uid,
          })
            .then(function (newPanier) {
              return res.status(201).json({
                token: jwtUtils.generateTokenForPanier(newPanier),
              });
            })
            .catch(function (err) {
              return res.status(500).json({ error: ' cant add panier' });
            });
        } else {
          Panier.findOne({
            where: { etat: 0 },
          })
            .then(function (panierFounded) {
              return res.status(201).json({
                token: jwtUtils.generateTokenForPanier(panierFounded),
              });
            })
            .catch(function (err) {
              return res.status(500).json({ error: ' cant found panier' });
            });
        }
      })
      .catch(function (err) {
        return res.status(400).json({ error: 'cant count' });
      });
  },
  getbyId: function (req, res) {
    var givenId = req.params.id;
    Panier.findOne({
      attributes: ['totale', 'uuid', 'userId'],
      where: { id: givenId },
    })
      .then(function (data) {
        return res.status(201).json(data);
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to get panier' });
      });
  },

  addProduct: function (req, res) {
    //Params
    var headerAuth = req.headers['authorization'];
    var idPanier = jwtUtils.getPanierId(headerAuth);
    if (idPanier < 0) return res.status(400).json({ error: 'wrong token' });
    var idProduct = req.params.id;
    var quantiteGeten = req.body.quantite;
    if (!quantiteGeten) {
      quantiteGeten = 1;
    }

    // found Product by given id
    Product.findOne({
      where: { id: idProduct },
    })
      .then(function (prod) {
        //foud panier by token
        Panier.findOne({
          where: { id: idPanier },
        })
          .then(function (panier) {
            //verify panier has product
            panier
              .hasProduct(prod)
              .then(function (data) {
                if (!data) {
                  //   no line_panier add product
                  panier
                    .addProduct(prod, {
                      through: {
                        panier_uuid: panier.uuid,
                        quantity: quantiteGeten,
                      },
                    })
                    .then(function (succss) {
                      //   message: "product was added successfully."
                      // update totale panier
                      panier
                        .update({
                          totale:
                            panier.totale + prod.prixPromotion * quantiteGeten,
                        })
                        .then(function (panierUpdated) {
                          return res.status(201).json(panierUpdated);
                        })
                        .catch(function (err) {
                          return res
                            .status(500)
                            .json({ error: 'cant update panier' });
                        });
                    })
                    .catch(function (err) {
                      return res
                        .status(500)
                        .json({ error: 'cant add prouct in panier' });
                    });
                } else {
                  // line_panier update quantity
                  Line_panier.findOne({
                    where: { panierId: idPanier, productId: idProduct },
                  })
                    .then(function (line) {
                      line
                        .update({
                          quantity: line.quantity + quantiteGeten,
                        })
                        .then(function (lineUpdated) {
                          //  return res.status(201).json(lineUpdated)

                          // update totale panier
                          panier
                            .update({
                              totale:
                                panier.totale +
                                prod.prixPromotion * quantiteGeten,
                            })
                            .then(function (panierUpdated) {
                              return res.status(201).json(panierUpdated);
                            })
                            .catch(function (err) {
                              return res
                                .status(500)
                                .json({ error: 'cant update panier' });
                            });
                        })
                        .catch(function () {
                          return res
                            .status(500)
                            .json({ error: 'cant add prouct again in panier' });
                        });
                    })
                    .catch(function (err) {
                      return res
                        .status(404)
                        .json({ error: 'unable to found line_panier' });
                    });
                }
              })
              .catch(function (err) {
                return res
                  .status(500)
                  .json({ error: 'cant verify prouct in panier' });
              });
          })
          .catch(function (err) {
            return res.status(404).json({ error: 'cant found  panier' });
          });

        // return res.status(201).json(prod);
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to get product' });
      });
  },
  deleteProduct: function (req, res) {
    //Params
    var headerAuth = req.headers['authorization'];
    var idPanier = jwtUtils.getPanierId(headerAuth);
    if (idPanier < 0) return res.status(400).json({ error: 'wrong token' });
    var idProduct = req.params.id;
    Product.findOne({
      where: { id: idProduct },
    })
      .then(function (prod) {
        Panier.findOne({
          where: { id: idPanier },
        })
          .then(function (panier) {
            panier
              .hasProduct(prod)
              .then(function (data) {
                if (data) {
                  Line_panier.findOne({
                    where: { panierId: idPanier, productId: idProduct },
                  })
                    .then(function (line) {
                      if (line.quantity > 1) {
                        line
                          .update({
                            quantity: line.quantity - 1,
                          })
                          .then(function (lineUpdated) {
                            panier
                              .update({
                                totale: panier.totale - prod.prixPromotion,
                              })
                              .then(function (panierUpdated) {
                                return res.status(201).json(panierUpdated);
                              })
                              .catch(function (err) {
                                return res
                                  .status(500)
                                  .json({ error: 'unable to update panier' });
                              });
                          })
                          .catch(function (err) {
                            return res
                              .status(500)
                              .json({ error: 'unable to update line' });
                          });
                      } else if (line.quantity == 1) {
                        Line_panier.destroy({
                          where: { panierId: idPanier, productId: idProduct },
                        })
                          .then((num) => {
                            if (num == 1) {
                              panier
                                .update({
                                  totale: panier.totale - prod.prixPromotion,
                                })
                                .then(function (panierUpdated) {
                                  return res.status(201).json(panierUpdated);
                                })
                                .catch(function (err) {
                                  return res
                                    .status(500)
                                    .json({ error: 'unable to update panier' });
                                });
                            } else {
                              res.send({
                                message: 'Cannot delete line_paner',
                              });
                            }
                          })
                          .catch(function (err) {
                            return res
                              .status(500)
                              .json({ error: 'unable to delete line_panier' });
                          });
                      }
                    })
                    .catch(function (err) {
                      return res
                        .status(404)
                        .json({ error: 'unable to found line_panier' });
                    });
                } else {
                  return res
                    .status(404)
                    .json({ error: 'panier dont ahve product' });
                }
              })
              .catch(function (err) {
                return res
                  .status(404)
                  .json({ error: 'unable to found line_panier' });
              });
          })
          .catch(function (err) {
            return res.status(500).json({ error: 'unable to get panier' });
          });
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to get product' });
      });
  },
  getPanierWithProduct: function (req, res) {
    //Params
    var headerAuth = req.headers['authorization'];
    var idPanier = jwtUtils.getPanierId(headerAuth);
    if (idPanier < 0) return res.status(400).json({ error: 'wrong token' });

    Panier.findOne({
      where: { id: idPanier },
      include: Product,
      through: { attributes: [] },
    })
      .then(function (panier) {
        return res.status(201).json(panier);
      })
      .catch(function (err) {
        return res.status(404).json({ error: 'unable to get panier' });
      });
  },
  commandeHist: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    Panier.findAll({
      where: { userId: userId, etat: { [Op.ne]: 0 } }, // commande en 1: attente (confirmé) or 2 :finalisé
      include: Product,
      through: { attributes: [] },
    })
      .then(function (data) {
        return res.status(201).json(data);
      })
      .catch(function (err) {
        return res.status(404).json({ error: 'unable to get paniers' });
      });
  },
  //liste commande pour admin en attente (confimer par user)
  demandescommandes: function (req, res) {
    Panier.findAll({
      where: { etat: 1 },
      //include : [{Product},{User}], ************** checkMe *****************
      include: Product,
      through: { attributes: [] },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res.status(404).json({ error: 'unable to get paniers' });
      });
  },
  // confirmer comande from user
  confirmCommande: function (req, res) {
    //Params
    var headerAuth = req.headers['authorization'];
    var idPanier = jwtUtils.getPanierId(headerAuth);
    var uid = uuid.v4();
    if (idPanier < 0) return res.status(400).json({ error: 'wrong token' });
    //BodyParms
    var modeLiv = req.body.modeLiv;
    var modePay = req.body.modePay;
    Panier.findOne({
      where: { id: idPanier },
    })
      .then(function (panier) {
        if (panier.etat == 0) {
          panier
            .update({
              etat: 1,
              modeLiv: modeLiv,
              modePay: modePay,
              // date_cmd : DATE.now()           ************** checkMe *****************
            })
            .then(function (panierUpdated) {
              var newPanier = Panier.create({
                userId: panierUpdated.userId,
                uuid: uid,
              })
                .then(function (newPanier) {
                  return res.status(201).json({
                    token: jwtUtils.generateTokenForPanier(newPanier),
                  });
                })
                .catch(function (err) {
                  return res.status(500).json({ error: ' cant add panier' });
                });
            })
            .catch(function (err) {
              return res.status(500).json({ error: 'unable to update panier' });
            });
        } else {
          return res
            .status(500)
            .json({ error: 'commande is already confirmed' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to get panier' });
      });
  },
  confirmLiv: function (req, res) {
    //params
    id = req.params.id;
    Panier.findOne({
      where: { id: id },
    })
      .then(function (panier) {
        if (panier.etat == 1) {
          panier
            .update({
              etat: 2,
            })
            .then(function (panierUpdated) {
              res.send({
                message: 'panier was updated successfully.',
              });
            })
            .catch(function (err) {
              return res.status(500).json({ error: 'unable to update panier' });
            });
        } else {
          return res.status(500).json({ error: 'commande alredy deilv' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to get panier' });
      });
  },
};
