var Mails = require('../models/mails');
var express = require('express');
var router = express.Router();

// Show all folders
router.get('/folders', function(req, res){
  console.log("Requesting folders");
  Mails.distinct('folder', function(err, folders){
    if (err){
      return res.send(err);
    }

    var model = [];
    for (var f in folders) {
      model.push({ 'folder' : folders[f]});
    }
    console.log("Folders: " + folders);
    res.json(folders);
  });
});

// Get messages from folder
router.get('/folders/:id', function(req, res){
  var keys = ["_id", "date", "folder", "subject", "to", "sender", "recipients", "cc", "text"]
  var req_keys = {}
  for (var k in keys) {
    req_keys[keys[k]] = 1
  }
  console.log("Getting mails for folder " + req.params.id);
  Mails.find({folder:req.params.id}, req_keys, function(err, mails){
    if (err){
      return res.send(err);
    }
    //console.log("Got response " + mails);
    res.json(mails);
  });
});

// Delete a folder
router.delete('/folders/:id', function(req, res){
  Mails.remove({
    folder: req.params.id
  },function(err, mails){
      if(err){
        return res.send(err);
      }
      res.json({message:"Successfully deleted"});
    });
});

// Update folder name
router.put('/folders/:id', function(req, res){
  console.log("Updating foldername: " + req.params.id + " -> " + req.query.name);
  var oldname = req.params.id;
  var newname = req.query.name;
  Mails.update({folder : oldname}, {$set : {folder : newname}}, {multi : true},
               function(err, mails) {
                 if(err){
                   return res.send(err);
                 }
                 res.json({message:"Successfully renamed"});
               });

})


module.exports = router;
