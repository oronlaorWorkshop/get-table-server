var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = new Schema({
    library:  String,
    floor: String,
    room:   String,
    vacant: {type: Boolean, default: true},
    reserved_to: { type: Schema.Types.ObjectId, ref: 'User' }
});

tableSchema.pre('save', function (next) {
    if (this.reserved_to) {
        this.vacant = false;
    }
    next();
});

var Table = mongoose.model('Table', tableSchema);

module.exports = Table;