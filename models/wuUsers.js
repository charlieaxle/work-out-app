var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wuUserSchema = new Schema ({
	
	info: {userName: String, joinDate: Date},
	exercises: [ {exerciseName: String, sets: Number, reps: String}],
	routines:  {routineName: String , routineExercises:[ String ]}
});

module.exports = mongoose.model('wuUser', wuUserSchema);
	
