var Msg = require('../models/mails');
var express = require('express');
var routen = express.Router();

// Show specifics to a mail
// Example id: 555343d9cf3dedf50aaa66db
routen.route('/msg/:id').get(function(req, res){
  console.log("Requesting mail " + req.params.id);
  Msg.find({"_id" : req.params.id},
           {"sender" : 1, "recipients" : 1, "date" : 1, "subject" : 1},
           function(err, mail){
             if (err){
               return res.send(err);
             }
             res.json(mail);
           });
});

// Deletes specific mail
routen.route('/msg/:id').delete(function(req, res){
  console.log("Deleting mail " + req.params.id);
  Msg.remove({"_id" : req.params.id}, function(err, mail){
    if (err){
      return res.send(err);
    }
    res.json(mail);
  });
});

// Creates a mail
//routen.route('/msg/:id').post(function(req, res){
routen.route('/msg').post(function(req, res){ 
  console.log("Creating mail");
  var m = new Msg();
  m.sender = req.query.s;
  m.recipients = req.query.r;
  m.text = req.query.t;
  m.date = new Date();
  console.log('req' + req);
  console.log('req.query:' + req.query);
  console.log('req.query.r:' + req.query.r);
  console.log(m);
  m.save(function(err) {
    if (err){
      return res.send(err);
    }
  });

  res.send("Saved");
});

routen.route('/msg/:id').put(function(req, res) {
  var id = req.params.id;
  var new_folder = req.query.folder;
  console.log("Moving " + id + " to " + new_folder);
  Msg.update({"_id" : id}, {$set : {"folder" : new_folder}},
             function(err, mail) {
               if (err) {
                 return res.send("didn't find");
               }
               res.json({message : "Moved successfully"});
             });
});

module.exports = routen;
