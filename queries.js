var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/sop';
var db = pgp(connectionString);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// ppppppppppppppppppppppppppppppppppppppppppppppppppppppp//
function getAllPickups(req, res, next) {
  db.any('select * from pickups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Pickups'
        });
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
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Pickup'
        });
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
  db.none('update users set username=$1, password=$2, email=$3, pin=$4, full_name=$5, street=$6, city=$7, state=$8, zone=$9, zip=$10, lat=$11, lat=$12, notes=$13  where id=$5',
    [req.body.username, req.body.password, req.body.email, parseInt(req.body.age), reg.body.full_name,
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

function updatePickup(req, res, next) {
  db.none('update pickups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
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
  db.result('delete from pups where id = $1', userID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} user`
        });
      /* jshint ignore:end */
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
  removeUser: removeUser
};
