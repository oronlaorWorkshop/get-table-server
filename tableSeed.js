var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGO_HOSTNAME + '/get_table');
var Table = require('./models/table');
var seeds = require('./models/seeds/tables.json');

seeds.forEach(function (seed, index) {
    Table.findOne(seed, function (err, table) {
        if (err) {
            console.log(err);
            return;
        }
        if (!table) {
            var table1 = new Table(seed);

            table1.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('seeded', seed);
                }
            });
        }
    });
});
