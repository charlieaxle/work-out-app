var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wuUserSchema = new Schema ({
	
	info: {userName: String, joinDate: Date},
	exercises: {type : Array, "default" : []},
	routines: {type: Array, "default" : []}
});

module.exports = mongoose.model('wuUser', wuUserSchema);
	
