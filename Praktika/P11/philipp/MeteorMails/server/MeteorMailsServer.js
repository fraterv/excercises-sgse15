Mails = new Mongo.Collection("mails");

// This should not be necessary, only if 'meteor remove insecure' was run.
// It doesn't work, anyway.
Mails.allow({
  insert: function (userId, doc) {
      return true;
  },
  update: function (userId, doc, fields, modifier) {
      return true;
  },
  remove: function (userId, doc) {
      console.log("Removal requested");
      // can only remove your own documents
      return true;
  }
});

Meteor.startup(function () {
    // code to run on server at startup
    //process.env.MONGO_URL = 'mongodb://localhost:27017/praktikum';
});

Meteor.publish("mails", function(folder) {
    console.log("Publishing mails");
    return Mails.find({}, {'folder': 1, sender: 1, recipients: 1, date: 1});
});

// These should not be necessary. And they don't work, too.
Meteor.methods({
    remove: function(id) {
        console.log("Removing " + id);
        // not working though it should: http://docs.meteor.com/#/full/selectors
        Mails.remove(id, function(err, count) {
            console.log(err);
            console.log(count);
        });
    },
    insert: function(sender, recipient, subject, folder, text) {
        console.log("Inserting mail");
        Mails.insert({sender: sender,
                      recipients: recipient,
                      subject: subject,
                      folder: folder,
                      text: text}, function(err, id) {
                                       if (err) {
                                           console.log("Error");
                                       }
                                   });
    },
    move: function(id, new_folder) {
        console.log("Moving mail");
        Mails.update(id, {$set: {folder: new_folder}}, function(err, res) {
            if (err) {
                console.log("Error");
            }
        });
    },
    renameFolder: function(oldname, newname) {
        console.log("Renaming folder");
        Mails.update({folder: oldname},
                     {$set : {folder : newname}},
                     {multi : true},
                     function(err, result) {
                         if (err) {
                             console.log("Error");
                         }
                     });
    }
});
