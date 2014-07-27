// BASE SETUP ==================================================

var express		= require('express');
var app			= express();
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var Player		= require('./app/models/player');

var port 		= process.env.PORT || 8080;
var mongoUser 	= process.env.MONGOLABS_USER;
var mongoPW		= process.env.MONGOLABS_PW;

mongoose.connect('mongodb://' + mongoUser + ':' + mongoPW + '@ds053459.mongolab.com:53459/roster');

app.use(bodyParser());

// ROUTES ======================================================
var router = express.Router();

// route middleware
router.use(function (req, res, next) {
	console.log('Route Called');
	next();
});

// test route
router.get('/', function (req, res){
	res.json({message: 'Pow pow!'});
})

router.route('/players')
	.post(function (req, res){
		var player = new Player();
			player.name 	= req.body.name;
			player.number 	= req.body.number;
			player.positon 	= req.body.position;
			player.goals	= req.body.goals;
			player.assists	= req.body.assists;

		player.save(function(err){
			if (err)
				res.send(err);

			res.json({message: 'Player Created'});
		});
	})

	.get(function(req, res) {
		Player.find(function (err, players){
			if (err)
				res.send(err);

			res.json(players);
		});
	});

router.route('/players/:id')
	.get(function(req,res){
		Player.findById(req.params.id, function(err, player){
			if(err)
				res.send(err);

			res.json(player);
		});
	})

	.put(function(req, res){
		Player.findById(req.params.id, function(err, player){
			if(err)
				res.send(err);

			if (req.body.name)
				player.name 	= req.body.name;
			if (req.body.number)
				player.number 	= req.body.number;
			if (req.body.position)
				player.positon 	= req.body.position;
			if (req.body.goals)
				player.goals	= req.body.goals;
			if (req.body.assists)
				player.assists	= req.body.assists;

			player.save(function(err){
				if (err)
					res.send(err);

				res.json({message: 'Player Updated'});
			});

		});
	})

	.delete( function( req, res ) {
		Player.remove({_id: req.params.id}, function(err, player){
			if(err)
				res.send(err);

			res.json({message: 'Player Deleted'});
		})
	})

app.use('/api', router);

// START SERVER ================================================
app.listen(port);
console.log('Good things happening on port ' + port);