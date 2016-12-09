var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userRoute = require('./routes/users.js');
var mongoose = require('mongoose');
var routines = require('./routes/addRoutine.js');

mongoose.connect('mongodb://10.0.0.183:27017/workUpp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 8080;


app.use(function(req, res, next){
	console.log('Something is happening');
	next();
});


app.use('/users', userRoute);

app.use('/addroutine', routines);

app.listen(port);
