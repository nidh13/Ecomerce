const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

global.__basedir = __dirname;

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to nidh application.' });
});

//db sync
const db = require('./app/models');
db.sequelize.sync();

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
}); */

//istnace route
require('./app/routes/users.routes')(app);
require('./app/routes/categorys.routes')(app);
require('./app/routes/products.routes')(app);
require('./app/routes/description.routes')(app);
require('./app/routes/feature.routes')(app);
require('./app/routes/accessories.routes')(app);
require('./app/routes/panier.routes')(app);

//for image
app.get('/image/:name', function (req, res, next) {
  console.log('image name');
  var options = {
    root: __dirname + '/uploads',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
