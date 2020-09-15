const db = require('../models');
const Feature = db.feature;
const Product = db.product;
module.exports = {
  add: function (req, res) {
    //Parms
    productId = req.params.productId;
    name = req.body.name;
    value = req.body.value;

    Feature.create({
      name: name,
      value: value,
      productId: productId,
    })
      .then(function (newFeature) {
        return res.status(201).json({
          success: true,
          newFeature,
          message: 'feature added succussfuly',
        });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: ' cant add feature' });
      });
  },
  delete: function (req, res) {
    const id = req.params.id;

    Feature.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            success: true,
            message: 'Feature was deleted successfully!',
          });
        } else {
          res.send({
            success: false,
            message: `Cannot delete Feature with id=${id}. Maybe Feature was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Feature with id=' + id,
        });
      });
  },
  update: function (req, res) {
    const id = req.params.id;

    Feature.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            success: true,
            message: 'Feature was updated successfully.',
          });
        } else {
          res.send({
            success: false,
            message: `Cannot update Feature with id=${id}. Maybe Feature was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating Feature with id=' + id,
        });
      });
  },
  deleteByProduct: function (req, res) {
    productId = req.params.productId;

    Feature.destroy({
      where: { productId: productId },
    })
      .then(function (ok) {
        res.send({
          success: true,
          message: 'Features was deleted successfully!',
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: 'Could not delete Features ',
        });
      });
  },
  getAll: function (req, res) {
    Feature.findAll()
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get features' });
      });
  },
  getById: function (req, res) {
    //Parms
    var givenId = req.params.id;
    Feature.findOne({
      where: { id: givenId },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get feature' });
      });
  },
  getAllByIdProduct: function (req, res) {
    productId = req.params.productId;

    Feature.findAll({
      where: { productId: productId },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get features' });
      });
  },
};
