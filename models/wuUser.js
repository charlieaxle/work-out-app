var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var wuUserSchema = new Schema({
	user_id : Number,
	exercises : Array,
	routines: Array
	 	
});

module.exports = mongoose.model('wuUser', wuUserSchema);
