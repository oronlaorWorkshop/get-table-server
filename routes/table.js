var express = require('express');
var router = express.Router();
var Table = require('../models/table');

router.get('/', function(req, res, next) {

  Table.find(req.query, function (err, results) {

    if (err) {
      throw err;
    }

    res.send(JSON.stringify(results));

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
