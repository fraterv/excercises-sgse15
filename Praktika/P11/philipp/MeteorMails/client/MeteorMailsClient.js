Mails = new Mongo.Collection("mails");

Session.set("current_folder", "sec_panel");
Session.set("current_view", "all_mails");
Session.set("current_mail", "");

var folderlist = ["sent", "deleted_items", "sent_items", "notes_inbox", "sec_panel",
                  "deleted", "discussion_threads", "elizabeth", "enron", "family",
                  "inbox", "_sent", "all_documents", "business", "calendar",
                  "compaq"];

Meteor.startup(function() {
    folderlist = _.uniq(Mails.find({}, {sort: {'folder': 1},
                                        folder: 1})
                        .fetch()
                        .map(function(mail) {
                            return mail.folder;
                        }), true);
    console.log("Creating folderlist");
    folders = Mails.distinct('folder', function(e, result) {
                  folderlist = result;
                  console.log(folderlist);
              });
});


Meteor.autorun(function() {
    console.log(folderlist);
    Meteor.subscribe("mails");
});


Template.body.helpers({
    folders: function() {
        console.log("Getting folders");
        //slowUpdateFolders();
        return folderlist;
    },

    mails: function() {
        console.log('get mails');
        return Mails.find({'folder': Session.get('current_folder')});
    },

    mailsView: function() {
        return Session.get('current_view') === 'all_mails';
    }
});

Template.body.events({
    "click .mail": function(event) {
        var id = event.currentTarget.id;
        Session.set('current_mail', id);
    },

    "click .btnMenu": function(event) {
        console.log("Menu toggle");
        console.log($('#mainMenu'));
    },

    "click .pager": function(event) {
        Session.set('current_view', event.target.id);
    }
});

Template.currentfolder.helpers({
    name: function() {
        return Session.get('current_folder');;
    }
});

Template.mail.helpers({
    selected: function(id) {
        if (id._str === Session.get('current_mail')) {
            return Session.get('current_mail');
        }
        return null;
    }
});

Template.mail.events({
    'click .btnMailDelete': function(event) {
        console.log("Deleting mail " + Session.get('current_mail'));
        // Not working. Crap.
        Mails.remove(Session.get('current_mail'), function(err, count) {
            console.log(err);
            console.log("Removed " + count);
        });
        // Function is called, but not working.
        Meteor.call('remove', Session.get('current_mail'), function(err, res) {
            console.log(err);
            console.log(res);
        });
    }
});

Template.mailSelected.events({
    ENTER: 13,

    'keyup .inputMoveMail': function(event) {
        console.log(event.keyCode);
        if (event.keyCode === 13) {
            event.stopPropagation();
        }
    }
});

Template.folder.events({
    'click': function(event) {
        var folder = event.currentTarget.innerHTML;
        console.log(folder);
        Session.set('current_folder', folder);
    }
});
