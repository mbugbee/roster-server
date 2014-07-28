// BASE SETUP ==================================================

var express		= require('express');
var app			= express();
var mongoose	= require('mongoose');
var Player		= require('./app/models/player');
var routes 		= require('./app/routes/players.js')(app);

var port 		= process.env.PORT || 8080;
var mongoUser 	= process.env.MONGOLABS_USER;
var mongoPW		= process.env.MONGOLABS_PW;

mongoose.connect('mongodb://' + mongoUser + ':' + mongoPW + '@ds053459.mongolab.com:53459/roster');


// START SERVER ================================================
app.listen(port);
console.log('Good things happening on port ' + port);