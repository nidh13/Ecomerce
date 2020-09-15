const db = require('../models');
const Accessorie = db.accessories;
const Product = db.product;
module.exports = {
  add: function (req, res) {
    //Parms
    productId = req.params.productId;
    name = req.body.name;

    Accessorie.create({
      name: name,
      productId: productId,
    })
      .then(function (newAccessorie) {
        return res.status(201).json({
          success: true,
          newAccessorie,
          message: 'accessoire added succussfuly',
        });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: ' cant add Accessorie' });
      });
  },
  delete: function (req, res) {
    const id = req.params.id;

    Accessorie.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            success: true,
            message: 'Accessorie was deleted successfully!',
          });
        } else {
          res.send({
            success: false,
            message: `Cannot delete Accessorie with id=${id}. Maybe Accessorie was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Accessorie with id=' + id,
        });
      });
  },
  update: function (req, res) {
    const id = req.params.id;

    Accessorie.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            success: true,
            message: 'Accessorie was updated successfully.',
          });
        } else {
          res.send({
            success: false,
            message: `Cannot update Accessorie with id=${id}. Maybe Accessorie was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: 'Error updating Accessorie with id=' + id,
        });
      });
  },
  deleteByProduct: function (req, res) {
    productId = req.params.productId;

    Accessorie.destroy({
      where: { productId: productId },
    })
      .then(function (ok) {
        res.send({
          success: true,
          message: 'accesories was deleted successfully!',
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: 'Could not delete Accessories ',
        });
      });
  },
  getAll: function (req, res) {
    Accessorie.findAll()
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get Accessories' });
      });
  },
  getById: function (req, res) {
    //Parms
    var givenId = req.params.id;
    Accessorie.findOne({
      where: { id: givenId },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get Accessorie' });
      });
  },
  getAllByIdProduct: function (req, res) {
    productId = req.params.productId;

    Accessorie.findAll({
      where: { productId: productId },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get Accessories' });
      });
  },
};
