var express = require('express');
var router = express.Router();
var db = require('../queries');
var pgp = require('pg-promise')();
var cors = require('cors');

var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
  allowedHeaders: ['Content-Type'],
  exposedHeaders:['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.options('*', cors(corsOptions)); // include before other routes

// router.get('/login2/:username', cors(corsOptions),db.getUserByUsername);
// router.post('/login', cors(corsOptions),db.loginUser);

router.get('/api/users',db.getAllUsers);
router.get('/api/user/:id',db.getSingleUser);
router.post('/api/user',db.createUser);
// router.post('/api/user2', cors(),db.createUser2);

router.put('/api/user/:id',db.updateUser);
router.delete('/api/user/:id',db.removeUser);

router.get('/api/pickups',db.getAllPickups);
router.get('/api/pickup/:id',db.getSinglePickup);
router.post('/api/pickup',db.createPickup);
router.put('/api/pickup/:id',db.updatePickup);
router.delete('/api/pickup/:id',db.removePickup);


// application -------------------------------------------------------------
// router.get('/', cors(), function (req, res) {
//     res.render('index', {title: 'node-postgres-promises'});
//     // load the single view file (angular will handle the page changes on the front-end)
// });

module.exports = router;
