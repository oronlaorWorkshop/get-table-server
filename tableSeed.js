require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGO_HOSTNAME + '/get_table');
var Table = require('./models/table');
var seeds = require('./models/seeds/tables.json');
var Q = require('q');

var promise = Q.promise(function (resolve, reject) {
    Table.remove({}, function (err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    })
});
seeds.forEach(function (seed, index) {
    
    promise = promise.then(Q.promise(function (resolve, reject) {
        Table.findOne(seed, function (err, table) {
            if (err) {
                console.log(err);
                reject();
                return;
            }
            if (!table) {
                var table1 = new Table(seed);

                table1.save(function (err) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('seeded', seed);
                        resolve();
                    }
                });
            } else {
                table = seed;
                table.save(function (err) {

                    if (err) {
                        console.log('updating failed');
                        reject(err);
                        return;
                    }

                    console.log('updated existing', seed);
                    resolve();
                });
            }
        });
    }));
    
    
});
