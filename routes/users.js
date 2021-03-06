var express = require('express');
var router = express.Router();
var wuUser = require('../models/wuUsers.js');

router.get('/', function(req, res) {
	res.send('Hello World');
});

router.route('/').post(function(req, res) {
	var newUser = new wuUser();
	newUser.info.userName = req.body.userName;
	newUser.info.firstName = req.body.firstName;
	newUser.info.lastName = req.body.lastName;
	newUser.info.joinDate = new Date();
	newUser.save(function(err) {
		if (err) throw err;
		res.json({message: 'User saved'});
	});
});

router.route('/init/:user_nm').get(function(req,res){
	wuUser.find({ "info.userName": req.params.user_nm}, function(err, data){
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
});


module.exports = router;

