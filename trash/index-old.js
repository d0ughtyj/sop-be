var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/api/users', db.getAllUsers);
router.get('/api/user/:id', db.getSingleUser);
router.post('/api/user', db.createUser);
router.put('/api/user/:id', db.updateUser);
router.delete('/api/user/:id', db.removeUser);

// router.get('/api/pickups', db.getAllPickups);
// router.get('/api/pickup/:id', db.getSinglePickup);
// router.post('/api/pickup', db.createPickup);
// router.put('/api/pickup/:id', db.updatePickup);
// router.delete('/api/pickup/:id', db.removePickup);


// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
