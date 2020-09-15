const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
var jwtUtils = require('../middleware/jwt.utils');
var asyncLib = require('async');

const Op = db.Sequelize.Op;

var bcrypt = require('bcrypt');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

module.exports = {
  // singUp
  singUp: function (req, res) {
    //Parms
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var email = req.body.email;
    var adress = req.body.adress;
    var password = req.body.password;
    var phone = req.body.phone;
    var phoneTwo = req.body.phoneTwo;
    var region = req.body.region;
    var ville = req.body.ville;
    // console.log("test"+prenom);

    if (email == null || password == null) {
      return res.status(400).json({ error: 'missing parameter' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        success: false,
        error:
          'password invalid (must length 4 - 8 and include 1 number at least)',
      });
    }

    User.findOne({
      attributes: ['email'],
      where: { email: email },
    })
      .then(function (userFound) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            var newUser = User.create({
              email: email,
              nom: nom,
              prenom: prenom,
              adress: adress,
              password: bcryptedPassword,
              ville: ville,
              region: region,
              phone: phone,
              phoneTwo: phoneTwo,
            })
              .then(function (newUser) {
                return res.status(201).json({
                  success: true,
                  userId: newUser.id,
                });
              })
              .catch(function (err) {
                return res
                  .status(500)
                  .json({ success: false, error: ' cant add user' });
              });
          });
        } else {
          return res
            .status(409)
            .json({ success: false, error: 'user already exist ' });
        }
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to verify user' });
      });
  },

  // login
  login: function (req, res) {
    //Parms
    var email = req.body.email;
    var password = req.body.password;
    if (email == null || password == null) {
      res.status(400).json({ error: 'missing parameter' });
    }
    User.findOne({
      where: { email: email },
    })
      .then(function (userFound) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (
            errBcrypt,
            resBcrypt
          ) {
            if (resBcrypt) {
              return res.status(200).json({
                success: true,
                userId: userFound.id,
                token: jwtUtils.generateTokenForUser(userFound),
              });
            } else {
              return res.status(500).json({
                success: false,
                error: 'invalid password',
              });
            }
          });
        } else {
          return res
            .status(404)
            .json({ success: false, error: 'user not found in db' });
        }
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to verify user' });
      });
  },
  //get User by Id
  getUserById: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: 'wrong token' });

    User.findOne({
      attributes: [
        'id',
        'email',
        'nom',
        'prenom',
        'adress',
        'phone',
        'phoneTwo',
        'region',
        'ville',
        'isAdmin',
      ],
      where: { id: userId },
    })
      .then(function (user) {
        if (user) {
          res.status(201).json({ success: true, user });
        } else {
          res.status(404).json({ success: false, error: 'user not found' });
        }
      })
      .catch(function (err) {
        res.status(500).json({ success: false, error: 'cannot fetch user' });
      });
  },

  //Update Profile
  updateProfile: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    //Parms
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var email = req.body.email;
    var adress = req.body.adress;
    var phone = req.body.phone;
    var phoneTwo = req.body.phoneTwo;
    var region = req.body.region;
    var ville = req.body.ville;

    if (userId < 0)
      return res.status(400).json({ success: false, error: 'wrong token' });
    User.findOne({
      attributes: [
        'id',
        'email',
        'nom',
        'prenom',
        'adress',
        'phone',
        'phoneTwo',
        'region',
        'ville',
      ],
      where: { id: userId },
    })
      .then(function (userFound) {
        if (userFound) {
          userFound
            .update({
              nom: nom ? nom : userFound.nom,
              prenom: prenom ? prenom : userFound.prenom,
              email: email ? email : userFound.email,
              adress: adress ? adress : userFound.adress,
              phone: phone ? phone : userFound.phone,
              phoneTwo: phoneTwo ? phoneTwo : userFound.phoneTwo,
              region: region ? region : userFound.region,
              ville: ville ? ville : userFound.ville,
            })
            .then(function (userFound) {
              return res.status(201).json({ success: true, userFound });
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ success: false, error: ' cant update user' });
            });
        } else {
          return res
            .status(404)
            .json({ success: false, error: 'user not found in db' });
        }
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ success: false, error: 'unable to verify user' });
      });
  },
};
