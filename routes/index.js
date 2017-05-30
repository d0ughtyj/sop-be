var express = require('express');
var router = express.Router();
var db = require('../queries');
var pgp = require('pg-promise')();
var cors = require('cors');

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% //
// http://brianflove.com/2017/03/22/express-cors-typescript/
var corsOptions = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
  preflightContinue: false,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept','X-Access-Token'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//use cors middleware
router.use(cors(corsOptions));

router.options('*', cors(corsOptions)); // include before other routes

router.get('/api/users',db.getAllUsers);
router.get('/api/pickups',db.getAllPickups);

router.get('/api/user/:id',db.getSingleUser);
router.get('/api/pickup/:id',db.getSinglePickup);

router.post('/api/user',db.createUser);
router.post('/api/pickup',db.createPickup);

router.put('/api/user/:id',db.updateUser);
router.put('/api/pickup/:id',db.updatePickup);

router.delete('/api/user/:id',db.removeUser);
router.delete('/api/pickup/:id',db.removePickup);


module.exports = router;
