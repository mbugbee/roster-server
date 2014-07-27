var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlayerSchema   = new Schema({
	name: String,
	number: Number,
	position: String,
	goals: Number,
	assists: Number,
});

module.exports = mongoose.model('Player', PlayerSchema);