var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
//mongodb connection
var dbname = 'praktikum';
var connectionString = 'mongodb://192.168.0.101/' + dbname;
console.log(connectionString);
mongoose.connect(connectionString);

var mailSchema = {
	sender: String,
    recipients: String,
    cc: String,
    text: String,
    mid: String,
    fpath: String,
    bcc: String,
    to: String,
    replyto: String,
    ctype: String,
    fname: String,
    date: String,
    folder: String,
    subject: String
}

var Mail=mongoose.model('Mail',mailSchema,'mails');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/folder',function(req, res){
	console.log("receives data from server");
	Mail.distinct('folder',function(err,doc){
		res.json(doc);
		console.log(err);
		console.log(doc);
	});

});

app.get('/folder/:id',function(req, res){
	var id=req.params.id;
	console.log("Die ID ist: "+ id);
	Mail.findOne({folder:id}, function(err,doc){
		console.log("DOC: "+doc);
		return res.json(doc);
	});
});

app.put('/folder/:id', function(req, res){
	var newname = req.params.id;
	var old = req.body.folder;
	console.log("Rename: "+ old + " Nach "+newname);
	Mail.update({folder:old},{$set : {folder:newname}},{multi:true},function(err, doc){
		res.json({message:"Successfully renamed"});
	});
	
});

app.delete('/folder/:id',function(req, res){
	console.log(req.params.id);
	Mail.remove({folder : req.params.id},function(err, doc){
		res.json({message:"Successfully deleted"});
	});
});

app.get('/msges/:id',function(req, res){
	console.log(req.params.id);
	Mail.find({folder:req.params.id},
		function(err,doc){
		res.json(doc);
	});
});

app.get('/msg/:id',function(req, res){
	console.log("PARAMA "+req.params.id);
	Mail.find({_id:req.params.id}, function(err,doc){
		res.json(doc);
		console.log(doc);
	});
});
app.put('/msg/:id',function(req, res){
	console.log(req.params.id);
	console.log(req.body.folder);
	Mail.update({_id:req.params.id},{$set:{folder:req.body.folder}},function(err, data){
		res.json({message:"Successfully Moved"});
	});
});

app.delete('/msg/:id',function(req, res){
	console.log(req.params.id);
	Mail.remove({},function(err, doc){
		res.json({message:"Successfully deleted"})
	});

});

app.post('/msg/',function(req, res){
	console.log(req.body);
});


app.get('*',function(req, res){
	res.sendfile('./public/index.html');
});

//555318d84aedaed4214d1522
app.listen(3000);
console.log("Arbeit Arbeit");