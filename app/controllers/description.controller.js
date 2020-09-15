const db = require('../models');
const Description = db.description;
const Product = db.product;
module.exports = {
  add: function (req, res) {
    //Parms
    productId = req.params.productId;
    name = req.body.name;
    value = req.body.value;

    Description.create({
      name: name,
      value: value,
      productId: productId,
    })
      .then(function (newDescription) {
        return res
          .status(201)
          .json({ success: true, newDescription, message: 'added succufully' });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: ' cant add description' });
      });
  },
  delete: function (req, res) {
    const id = req.params.id;

    Description.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            success: true,
            message: 'description was deleted successfully!',
          });
        } else {
          res.send({
            success: false,
            message: `Cannot delete Description with id=${id}. Maybe Description was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Description with id=' + id,
        });
      });
  },
  update: function (req, res) {
    const id = req.params.id;

    Description.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            success: true,
            message: 'Description was updated successfully.',
          });
        } else {
          res.send({
            success: false,
            message: `Cannot update Description with id=${id}. Maybe Description was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating Description with id=' + id,
        });
      });
  },
  deleteByProduct: function (req, res) {
    productId = req.params.productId;

    Description.destroy({
      where: { productId: productId },
    })
      .then(function (ok) {
        res.send({
          success: true,
          message: 'DESCRIPTIONS was deleted successfully!',
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: 'Could not delete Descriptions ',
        });
      });
  },
  getAll: function (req, res) {
    Description.findAll()
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get Descriptions' });
      });
  },
  getById: function (req, res) {
    //Parms
    var givenId = req.params.id;
    Description.findOne({
      where: { id: givenId },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get Description' });
      });
  },
  getAllByIdProduct: function (req, res) {
    productId = req.params.productId;

    Description.findAll({
      where: { productId: productId },
    })
      .then(function (data) {
        return res.status(201).json({ success: true, data });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to get Descriptions' });
      });
  },
};
