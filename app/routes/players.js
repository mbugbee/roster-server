var express		= require('express');
var router 		= express.Router();
var Player		= require('../models/player');
var cors		= require('cors');


// route middleware
router.use(function (req, res, next) {
	console.log('Route Called');
	router.use(cors());
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
		res.header("Access-Control-Allow-Origin", "*"); 
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
        Player.find({}, function (err, players){
            if (err)
                res.send(err);

            console.log('resolving players');
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

module.exports.players = router;