var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = new Schema({
    library:  String,
    floor: String,
    room:   String,
    vacant: Boolean,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Table = mongoose.model('Table', tableSchema);

module.exports = Table;