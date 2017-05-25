var promise = require('bluebird');
var cors = require('cors');

var options = {
  // Initialization Options
  promiseLib: promise
};

// const cn                =  process.env.DATABASE_URL || {
//   host    : process.env.HOST,
//   port    : process.env.PORT,
//   database: 'todos',
//   user    : process.env.USER,
//   password: process.env.DB_PASSWORD
// }
//
// const db                = pgp(cn)


var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sop';
var db = pgp(connectionString);

// {
//   status: 'success',
//   data: data,
//   message: 'Retrieved ALL Users'
// }


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      // res.status(200)
        res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

// status: 'success',
// data: data,
// message: 'Retrieved ALL Pickups'
// ppppppppppppppppppppppppppppppppppppppppppppppppppppppp//
function getAllPickups(req, res, next) {
  db.any('select * from pickups')
    .then(function (data) {
      // res.status(200)
        res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

// {
//   status: 'success',
//   data: data,
//   message: 'Retrieved ONE Pickup'
// }

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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function createPickup(req, res, next) {
  req.body.user_id = parseInt(req.body.user_id);
  req.body.zone = parseInt(req.body.zone);
  req.body.julian_day_number = parseInt(req.body.julian_day_number);
  req.body.year = parseInt(req.body.year);

  db.none('insert into pickup(user_id, type, date_entered, date_for_pickup, status, company, zone, julian_day_number, notes, year)' +
      'values(${user_id}, ${type}, ${date_entered}, ${date_for_pickup}, ${status}, ${company}, ${zone}, ${julian_day_number},${notes},${year})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Pickup Request'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function createUser(req, res, next) {
  req.body.pin = parseInt(req.body.pin);
  req.body.zone = parseInt(req.body.zone);
  req.body.lat = parseInt(req.body.lat);
  req.body.long = parseInt(req.body.long);

  db.none('insert into users(username, password, email, full_name, full_address, street, city, state, zip, zone, pin, lat, long, notes)' +
      'values(${username}, ${password}, ${email}, ${full_name}, ${full_address}, ${street}, ${city}, ${state},${zip},${zone},${pin},${lat},${long},${notes})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function updateUser(req, res, next) {
  db.none('update users set username=$1, password=$2, email=$3, pin=$4, full_name=$5, street=$6, city=$7, state=$8, zone=$9, zip=$10, lat=$11, lat=$12, notes=$13  where id=$14',
    [req.body.username, req.body.password, req.body.email, parseInt(req.body.pin),
      reg.body.full_name,reg.body.street,
      reg.body.city,reg.body.state,reg.body.zone,reg.body.zip,
      parseInt(req.body.lat),parseInt(req.body.long),reg.body.notes,
       parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function updatePickup(req, res, next) {
  db.none('update pickups set user_id=$1, type=$2, date_entered=$3, date_for_pickup=$4, status=$5,company=$6, parseInt(req.body.zone)=$7,parseInt(julian_day_number=$8,year=$8,notes=$9,where id=$10',
    [parseInt(req.body.user_id),req.body.type, req.body.date_entered,reg.body.date_for_pickup,reg.body.status,reg.body.company, parseInt(req.body.zone),parseInt(req.body.julian_day_number),
      parseInt(req.body.year), req.body.notes,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Pickup'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// *********************************************************//
// *********************************************************//
function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.result('delete from users where id = $1', userID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} user`
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
  db.result('delete from users where id = $1', pickupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} pickup`
        });
      /* jshint ignore:end */
      // look at running function to delete user events
    })
    .catch(function (err) {
      return next(err);
    });
}
// *********************************************************//


module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
  getAllPickups: getAllPickups,
  getSinglePickup: getSinglePickup,
  createPickup: createPickup,
  updatePickup: updatePickup,
  removePickup: removePickup
};
