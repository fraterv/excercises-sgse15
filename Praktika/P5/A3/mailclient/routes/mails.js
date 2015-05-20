var Mails = require('../models/mails');
var express = require('express');
var router = express.Router();

router.route('/mails').get(function(req, res){
	Mails.distinct('folder',function(err, mails){
		if (err){
			return res.send(err);
		}

		res.json(mails);
	});
});

router.route('/mails/:id').get(function(req, res){
	Mails.count({folder:req.params.id},function(err, mails){
		if (err){
			return res.send(err);
		}
		res.json(mails);
	});
});

router.route('/mails/:id').delete(function(req, res){
	Mails.remove({
		folder: req.params.id
	},function(err, mails){
		if(err){
			return res.send(err);
		}
		res.json({message:"Successfully deleted"});
	});
});

router.route('/mails/:id').put(function(req, res){
	console.log(req.params.id);
	console.log(req.body.name);
})


module.exports = router;