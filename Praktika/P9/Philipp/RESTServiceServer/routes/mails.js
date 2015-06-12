var Mails = require('../models/mails');
var express = require('express');
var router = express.Router();

// Show all folders
router.route('/mails').get(function(req, res){
    console.log("Requesting mails");
    Mails.distinct('folder',function(err, mails){
        if (err){
            return res.send(err);
        }

        // To allow access from other domain
        // (which is also same host but different port):
        res.set('Access-Control-Allow-Origin', '*');

        res.json(mails);
    });
});

// Get count of messages in folder
router.route('/mails/:id').get(function(req, res){
    Mails.count({folder:req.params.id},function(err, mails){
        if (err){
            return res.send(err);
        }

        res.set('Access-Control-Allow-Origin', '*');
        res.json(mails);
    });
});

// Delete a folder
router.route('/mails/:id').delete(function(req, res){
    Mails.remove({
        folder: req.params.id
    },function(err, mails){
          if(err){
              return res.send(err);
          }
          res.set('Access-Control-Allow-Origin', '*');
          res.json({message:"Successfully deleted"});
      });
});

// Update folder name
router.route('/mails/:id').put(function(req, res){
    console.log(req.params.id);
    console.log(req.query);
    var oldname = req.params.id;
    var newname = req.query.folder;
    console.log("Renaming " + oldname + " to " + newname);
    Mails.update({folder : oldname}, {$set : {folder : newname}}, {multi : true},
                 function(err, mails) {
                     if(err){
                         return res.send(err);
                     }
                     res.set('Access-Control-Allow-Origin', '*');
                     res.json({message:"Successfully renamed"});
                 });

})


module.exports = router;
