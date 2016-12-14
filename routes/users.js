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


module.exports = router;

