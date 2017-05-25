var express = require('express');
var router = express.Router();
var db = require('../queries');
var cors = require('cors');


router.get('/api/users', cors(),db.getAllUsers);
router.get('/api/user/:id', cors(),db.getSingleUser);
router.post('/api/user', cors(),db.createUser);
router.put('/api/user/:id', cors(),db.updateUser);
router.delete('/api/user/:id', cors(),db.removeUser);

router.get('/api/pickups', cors(),db.getAllPickups);
router.get('/api/pickup/:id', cors(),db.getSinglePickup);
router.post('/api/pickup', cors(),db.createPickup);
router.put('/api/pickup/:id', cors(),db.updatePickup);
router.delete('/api/pickup/:id', cors(),db.removePickup);


// application -------------------------------------------------------------
router.get('/', cors(), function (req, res) {

    res.render('index', {title: 'node-postgres-promises'});
    // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
