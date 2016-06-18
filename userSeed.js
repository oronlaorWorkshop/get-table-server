require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGO_HOSTNAME + '/get_table');
var User = require('./models/user');
var seeds = require('./models/seeds/users.json');

seeds.forEach(function (seed, index) {
    User.findOne(seed, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        if (!user) {
            var user1 = new User(seed);

            user1.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('seeded', seed);
                }
            });
        } else {
            console.log('existing', seed);
        }
    });
});
