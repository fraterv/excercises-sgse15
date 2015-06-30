Mails = new Mongo.Collection("mails");

if (Meteor.isServer) {

    Meteor.startup( function () {
        return Meteor.methods({

            // Mail interface

            remove: function(id) {
                console.log("Removing " + id);
                // not working though it should: http://docs.meteor.com/#/full/selectors
                return Mails.remove({_id: id});
            },
            create: function(id, sender, recipient, subject, folder, text) {
                console.log("Inserting mail");
                console.log(sender + ' ' + recipient + ' ' +
                            subject + ' ' + folder + ' ' + text);
                return Mails.insert({_id: id,
                                     sender: sender,
                                     recipients: recipient,
                                     subject: subject,
                                     folder: folder,
                                     text: text});
            },
            move: function(id, new_folder) {
                console.log("Moving mail");
                Mails.update(id, {$set: {folder: new_folder}}, function(err, res) {
                    if (err) {
                        console.log("Error");
                    }
                });
            },

            // Folder interface

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
            },
            removeFolder : function(f) {
                console.log("removeFolder " + f);
                return Mails.remove({folder: f});
            },
            loadFolder : function() {
                var allMails = Mails.find().fetch();
                var folders = _.uniq(allMails, false,
                                     function(m) {return m.folder});
                console.log(folders);
                var result = _.pluck(folders, "folder");
                console.log(result);
                return result;
            }
        });
    });
}
