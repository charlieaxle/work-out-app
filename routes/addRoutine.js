var express = require('express');
var router = express.Router();
var wuUser = require('../models/wuUsers.js');

router.route('/:user_id').put(function(req, res) {
	//var keys = Object.keys(req.body);
	var exArr =[];
	
	for (var j=0; j< req.body.exercises.length; j++){
		exArr.push(req.body.exercises[j].name);
	}

	//for (var i=0; i<keys.length; i++){
	//	if (keys[i] !== 'newRoutine') {
	//		exArr.push(req.body[keys[i]]);
	//	};
	//};
	
	wuUser.findByIdAndUpdate( 
		req.params.user_id,
		{$push : {"routines" : { name : req.body.newRoutine, routineExercises: exArr}}},
		function(err, data) {
			if (err) {
				return res.json({message : 'Error, could not add routine :('});
				}
			//res.json({message: 'Routine Added :)'});
		}
	);

	wuUser.findByIdAndUpdate( 
		req.params.user_id,
		{$push : {"exercises" : req.body.exercises}},
		function(err, data) {
			if (err) {
				return res.json({message : 'Error, could not add routine :('});
				}
			res.json({message: 'Routine Added :)'});
		}
	);


});
		

module.exports= router;		
