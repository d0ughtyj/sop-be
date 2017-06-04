//http://vitaly-t.github.io/pg-promise/QueryFile.html
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};


//
// const db                = pgp(cn)
// var cn = {
//     host: 'localhost',
//     port: 5432,
//     database: 'my-database-name',
//     user: 'user-name',
//     password: 'user-password'
// };
// https://npm.taobao.org/package/pg-promise#queries-and-parameters

var pgp = require('pg-promise')(options);


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sop';
var db = pgp(connectionString);
console.log('(queries.js -- connection string ', connectionString);



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function getAllUsers(req, res, next) {
  console.log('get user list from be');
  db.any('SELECT * from users')
    .then(function (data) {
      // res.status(200)
        res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

// ppppppppppppppppppppppppppppppppppppppppppppppppppppppp//
function getAllPickups(req, res, next) {
  db.any('SELECT * from pickups')
    .then(function (data) {
      // res.status(200)
        res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function getSinglePickup(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('select * from pickups where id = $1', userID)
    .then(function (data) {
      // res.status(200)
        res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function getUserByUsername(req, res, next) {
  var username = req.params.username;
  db.one('select * from users where usdername = $1', username)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function getSingleUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('select * from users where id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// ******************************************** //


// ******************************************** //

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function createPickup(req, res, next) {
  console.log('create pick req.body ',req.body);
  db.any('INSERT INTO pickups(user_id, type, zone, status, notes) VALUES($1, $2, $3, $4, $5) RETURNING id', [parseInt(req.body.user_id), req.body.type, parseInt(req.body.zone), req.body.status, req.body.notes])
      .then(data => {
        console.log('return data id', data);
        res.status(200)
          .json({
          status: 'success',
          message: 'inserted one user record'
        });
        // added 124 - 127 for response
      })
      .catch(error => {
          console.log('(126) ERROR:', error); // print error;
      });
  }

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function createUser(req, res, next) {
  // var username = username.toLowerCase()
  var full_address = 'tbd';
  var username = req.body.username.toLowerCase();
  var obj ={
    username: username,
    pin: parseInt(req.body.pin),
    email: req.body.email,
    full_name: req.body.full_name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    zone: 1
  };
  // console.log(obj);
db.any('INSERT INTO users(username, pin, email, full_name,street,city,state,zip, zone) VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9)',[username,parseInt(req.body.pin),req.body.email,req.body.full_name,req.body.street,req.body.city,req.body.state, req.body.zip, 1] )
    .then(function(data) {
      res.status(200)
        .json({
        status: 'success',
        message: 'inserted one user record'
      });
    })
    .catch(function (error) {
        // error;
        return next('create user error (150)',error);
    });
  }

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// email=$2, pin=$3, full_name=$4, full_address=$5, street=$6, city=$7, state=$8, zone=$9, zip=$10, notes=$11


function updateUser(req, res, next) {
  console.log('updateUser ', req.body, req.params.id, req.body.id);
  var obj = {
    id: parseInt(req.params.id),
    username: req.body.username.toLowerCase(),
    email: req.body.email,
    full_name: req.body.full_name,
    street:  req.body.street,
    city:  req.body.city,
    state:  req.body.state,
    zone:  parseInt(req.body.zone),
    zip:  req.body.zip,
    notes:  req.body.notes
  };
  // console.log('obj ', obj);
  db.any('update users set username=$1, email=$2, full_name=$3, street=$4,city=$5, state=$6, zone=$7, zip=$8, notes=$9 where id=$10 RETURNING id',
  [req.body.username.toLowerCase(),
    req.body.email,
    req.body.full_name,
    req.body.street,
    req.body.city,
    req.body.state,
    parseInt(req.body.zone),
    req.body.zip,
    req.body.notes,
    parseInt(req.params.id)])
    .then((data) => {
      console.log('data ',data);
      res.status(200)
        .json(data);
    })
    .catch((error) => {
      console.log(error);
      return next(error);
    });
}
// full_address=${full_address}, street=${street}, city=${city}, state=${state}, zone=${zone}, zip=${zip}, notes=${notes}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// date_entered=$3, date_for_pickup=$4 req.body.date_entered, reg.body.date_for_pickup, req.body.date_entered,reg.body.date_for_pickup,
function updatePickup(req, res, next) {
  console.log('update pickup - be ', req.body + 'user id ' + req.body.user_id);
  var obj = {
    user_id: parseInt(req.body.user_id),
    type: req.body.type,
    status: req.body.status,
    zone: parseInt(req.body.zone),
    notes: req.body.notes,
    id: parseInt(req.params.id)
  };
  db.any('UPDATE pickups SET user_id=${user_id}, type=${type}, status=${status}, notes=${notes} WHERE id=${id}',obj)
    .then((data) => {
      // console.log('data ',obj); //status=${status}, zone=${zone}, notes=${notes}
      res.status(200)
        .json(obj);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
}

// *********************************************************//
// *********************************************************//
function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  console.log('req.params.id ', req.params.id);
  db.result('delete from users where id = $1', userID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} user'
        });
      /* jshint ignore:end */
      // look at running function to delete user events
    })
    .catch(function (err) {
      return next(err);
    });
}
// *********************************************************//
// *********************************************************//
function removePickup(req, res, next) {
  var pickupID = parseInt(req.params.id);
  console.log('delete pickup req.params.id ', req.params.id);
  db.result('delete from pickups where id = $1', pickupID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} pickup'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// *********************************************************//
module.exports = {
  getUserByUsername: getUserByUsername,
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  getSinglePickup: getSinglePickup,
  createUser: createUser,
  createPickup: createPickup,
  getAllPickups: getAllPickups,
  updatePickup: updatePickup,
  updateUser: updateUser,
  removeUser: removeUser,
  removePickup: removePickup
};
