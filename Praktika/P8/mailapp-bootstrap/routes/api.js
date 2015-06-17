var Mail = require('../mailmodel');
var express = require('express');
var router = express.Router();

router.get('/folder',function(req, res){
        console.log("receives data from server");
        Mail.distinct('folder',function(err,doc){
                res.json(doc);
                console.log(err);
                console.log(doc);
        });

});

router.get('/folder/:id',function(req, res){
        var id=req.params.id;
        console.log("Die ID ist: "+ id);
        Mail.findOne({folder:id}, function(err,doc){
                console.log("DOC: "+doc);
                return res.json(doc);
        });
});

router.put('/folder/:id', function(req, res){
        var newname = req.params.id;
        var old = req.body.folder;
        console.log("Rename: "+ old + " Nach "+newname);
        Mail.update({folder:old},{$set : {folder:newname}},{multi:true},function(err, doc){
                res.json({message:"Successfully renamed"});
        });

});

router.delete('/folder/:id',function(req, res){
        console.log(req.params.id);
        Mail.remove({folder : req.params.id},function(err, doc){
                res.json({message:"Successfully deleted"});
        });
});

router.get('/msges/:id',function(req, res){
        console.log(req.params.id);
        Mail.find({folder:req.params.id},
                function(err,doc){
                res.json(doc);
        });
});

router.get('/msg/:id',function(req, res){
        console.log("PARAMA "+req.params.id);
        Mail.find({_id:req.params.id}, function(err,doc){
                res.json(doc);
                console.log(doc);
        });
});
router.put('/msg/:id',function(req, res){
        console.log(req.params.id);
        console.log(req.body.folder);
        Mail.update({_id:req.params.id},{$set:{folder:req.body.folder}},function(err, data){
                res.json({message:"Successfully Moved"});
        });
});

router.delete('/msg/:id',function(req, res){
        console.log(req.params.id);
        Mail.remove({},function(err, doc){
                res.json({message:"Successfully deleted"})
        });

});

router.post('/msg/',function(req, res){
        console.log(req.body);
});


module.exports = router;
