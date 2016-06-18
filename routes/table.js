var express = require('express');
var router = express.Router();
var Table = require('../models/table');
var User = require('../models/user');

/*
- get vacant - tables by lib, floor?, room?
- put reserve (table_id, user_id)
 */
 router.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods","GET, POST, PUT");
   res.header("Access-Control-Allow-Headers","Content-Type");
     next();
 });

router.get('/', function(req, res, next) {

  Table.find(req.query, function (err, results) {

    if (err) {
      throw err;
    }

    res.json(results);

  });
});

router.get('/vacant', function(req, res, next) {

  var queryParams = {};

  queryParams.vacant = {$ne: false};

  if (!req.query.library) {
    res.status(400).send('\'library\' parameter is missing');
    return;
  }

  queryParams.library = req.query.library;

  if (req.query.floor) {
    queryParams.floor = req.query.floor;
  }

  if (req.query.room) {
    queryParams.room = req.query.room;
  }

  Table.find(queryParams, function (err, results) {

    if (err) {
      throw err;
    }

    res.json(results);

  });
});

router.put('/:table_id/reserve/:user_id', function (req, res, next) {

  User.findById(req.params.user_id, function (err, user) {

    if (err) {
      throw err;
    }

    if (!user) {
      res.status(400).send('user cannot be found');
    }

    Table.find({reserved_to: user}, function (err, tables) {
      if (err) throw err;
      if (tables.length) {
        res.status(403).send('user already reserved another table');
        return;
      }
      Table.findById(req.params.table_id, function (err, table) {
        if (err) {
          throw err;
        }
        table.reserved_to = user;
        table.save(function (err) {
          if (err) {
            throw err;
          }
          res.send();
        });
      });
    });
  });

});

router.post('/:table_id/occupy', function (req, res, next) {

    Table.findById(req.params.table_id, function (err, table) {
      if (err) {
        throw err;
      }
      table.vacant = false;
      table.save(function (err) {
        if (err) {
          throw err;
        }
        res.send();
      });
    });
});

router.post('/:table_id/free', function (req, res, next) {

    Table.findById(req.params.table_id, function (err, table) {
      if (err) {
        throw err;
      }
      table.vacant = true;
      table.save(function (err) {
        if (err) {
          throw err;
        }
        res.send();
      });
    });
});

router.get('/:id', function(req, res, next) {

  Table.findOne({_id: req.params.id}, function (err, table) {

    if (err) {
      throw err;
    }

    res.send(JSON.stringify(table));

  });
});

module.exports = router;
