var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Table = require('../models/table');

/*
get status
 */

router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});

router.get('/:username', function(req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) {
      throw err;
    }

    Table.findOne({reserved_to: user}, function (err, table) {
      if (err) throw err;

      var result = {
        reserved_table: table,
        user: user
      };

      res.json(result)

    });

  });
});

router.post('/:user_id/cancel_reservation', function (req, res, next) {

  User.findById(req.params.user_id, function (err, user) {

    if (err) {
      throw err;
    }

    if (!user) {
      res.status(400).send('user cannot be found');
      return;
    }

    Table.findOne({reserved_to: user}, function (err, table) {
      if (err) throw err;
      if (!table) {
        res.send('user did not have any reserved table');
      } else {
        table.reserved_to = null;
        table.vacant = true;
        table.save(function (err) {
          if (err) throw err;
          res.send();
        });
      }
    });
  });

});


module.exports = router;
