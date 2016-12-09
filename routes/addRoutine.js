var express = require('express');
var router = express.Router();
var wuUser = require('../models/wuUsers.js');

router.route('/:user_id').put(function(req, res) {
	
	wuUser.findByIdAndUpdate( 
		req.params.user_id,
		{$push : {"routines" : { name : req.body.newRoutine}}},
		function(err, data) {
			if (err) {
				res.json({message : 'Error, could not add routine :('});
				}
			res.json({message: 'Routine Added :)'});
		}
	);
});
		

module.exports= router;		
