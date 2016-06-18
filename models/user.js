var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true}
});

userSchema.pre('save', function (next) {
    next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;