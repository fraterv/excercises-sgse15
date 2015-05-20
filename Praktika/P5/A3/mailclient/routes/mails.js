var Mails = require('../models/mails');
var express = require('express');
var router = express.Router();

router.route('/mails').get(function(req, res){
	Mails.find(function(err, mails){
		if (err){
			return res.send(err);
		}

		res.json(mails);
	});
});

module.exports = router;