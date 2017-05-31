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
// function createPickup(req, res, next) {
//   console.log('create pick req.body ',req.body);
// db.none('INSERT INTO pickups(user_id, type, notes) VALUES($1, $2, $3)', parseInt(req.body.user_id), req.body.type, req.body.notes)
//     .then(function() {
//         res.status(200)
//           .json({
//           status: 'success',
//           message: 'inserted one pickup record'
//         });
//     })
//     .catch(function (error) {
//         // error;
//         return next('create pickup error ', error);
//     });
// }
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function createPickup(req, res, next) {
  console.log('create pick req.body ',req.body);
  db.any('INSERT INTO pickups(user_id, type, notes) VALUES($1, $2, $3) RETURNING id', [parseInt(req.body.user_id), req.body.type, req.body.notes])
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
  var obj ={
    username: req.body.username,
    pin: parseInt(req.body.pin),
    full_name: req.body.full_name
  };
db.none('INSERT INTO users(username, pin, full_name) VALUES(${username}, ${pin}, ${full_name})', obj)
    .then(function() {
      res.status(200)
        .json({
        status: 'success',
        message: 'inserted one user record'
      });
    })
    .catch(function (error) {
        // error;
        return next('create user error',error);
    });
  }

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

// function createUser2(req, res, next) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const email = req.body.email;
//   const full_name = req.body.full_name;
//   const full_address = req.body.full_address;
//   const street = req.body.street;
//   const city = req.body.city;
//   const state = req.body.state;
//   const zip = req.body.zip;
//   const zone = parseInt(req.body.zone);
//   const pin = parseInt(req.body.pin);
//   const lat = parseInt(req.body.lat);
//   const long = parseInt(req.body.long);
//   const notes = parseInt(req.body.notes);
//
//   db.none('insert into users(username, password, email, full_name, full_address, street, city, state, zip, zone, pin, lat, long, notes)' +
//       'values(${username}, ${password}, ${email}, ${full_name}, ${full_address}, ${street}, ${city}, ${state},${zip},${zone},${pin},${lat},${long},${notes})',
//     {username, password, email, full_name, full_address, street, city, state,zip,zone,pin,lat,long,notes})
//     .then(function () {
//       res.status(201)
//         .json(data);
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function updateUser(req, res, next) {
  console.log('updateUser ', req.body, req.params.id);
  db.one('UPDATE users SET username=$1, email=$2, pin=$3, full_name=$4, full_address=$5, street=$6, city=$7, state=$8, zone=$9, zip=$10, notes=$11  WHERE id=$12',
    [
      req.body.username,
      req.body.email,
      parseInt(req.body.pin),
      req.body.full_name,
      req.body.full_address,
      req.body.street,
      req.body.city,
      req.body.state,
      parseInt(reg.body.zone),
      req.body.zip,
      req.body.notes,
      parseInt(req.params.id)
    ])
    .then((data) => {
      res.status(200)
        .json(data);
    })
    .catch((error) => {
      return next(error);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function updatePickup(req, res, next) {
  db.none('update pickups set user_id=$1, type=$2, date_entered=$3, date_for_pickup=$4, status=$5,company=$6, parseInt(req.body.zone)=$7,parseInt(julian_day_number=$8,year=$8,notes=$9,where id=$10',
    [parseInt(req.body.user_id),req.body.type, req.body.date_entered,reg.body.date_for_pickup,reg.body.status,reg.body.company, parseInt(req.body.zone),parseInt(req.body.julian_day_number),
      parseInt(req.body.year), req.body.notes,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
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
