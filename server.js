// BASE SETUP ==================================================

var express		= require('express');
var app			= express();
var mongoose	= require('mongoose');
var Player		= require('./app/models/player');
var bodyParser	= require('body-parser');
var cors		= require('cors');

var port 		= process.env.PORT || 8080;
var mongoUser 	= process.env.MONGOLABS_USER;
var mongoPW		= process.env.MONGOLABS_PW;

mongoose.connect('mongodb://' + mongoUser + ':' + mongoPW + '@ds053459.mongolab.com:53459/roster');
var connection = mongoose.connection;
	connection.once('open', function() {
  		console.log('db connected!');                         
	});
	connection.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser());
app.use(cors());
app.use('/api', require('./app/routes/players').players);

// START SERVER ================================================
app.listen(port);
console.log('Good things happening on port ' + port + process.env.MONGOLABS_USER + mongoPW);