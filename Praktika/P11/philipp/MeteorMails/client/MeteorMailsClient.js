//Mails = new Mongo.Collection("mails");

Session.set("current_folder", "Select...");
Session.set("current_view", "all_mails");
Session.set("current_mail", "");

// testing
var folderlist = ["sent", "deleted_items", "sent_items", "notes_inbox", "sec_panel",
                  "deleted", "discussion_threads", "elizabeth", "enron", "family",
                  "inbox", "_sent", "all_documents", "business", "calendar",
                  "compaq"];

Meteor.startup(function() {
    console.log("Creating folderlist");
    folders = Mails.distinct('folder', function(e, result) {
                  folderlist = result;
                  console.log(folderlist);
              });
});

Meteor.autorun(function() {
    console.log(folderlist);
    //Meteor.subscribe("mails");
});


Template.body.helpers({
    folders: function() {
        var data = Mails.find().fetch();
        var distinctData = _.uniq(data, false, function(d) {return d.folder});
        return _.pluck(distinctData, "folder");
        console.log("Getting folders");
        //slowUpdateFolders();
        var folders = Meteor.call('loadFolder');
        console.log(folders);
        return folderlist;
    },

    mails: function() {
        console.log('get mails');
        return Mails.find({'folder': Session.get('current_folder')});
    }
});

Template.body.events({
    "click .mail": function(event) {
        var id = event.currentTarget.id;

        if (id === Session.get('current_mail')) { // toggle
            console.log('toggle');
            id = '';
        }
        Session.set('current_mail', id);
        console.log('Set to ' + Session.get('current_mail'));
    },

    "click .btnMenu": function(event) {
        console.log("Menu toggle");
        console.log($('#mainMenu'));
    },

    "click .pager": function(event) {
        Session.set('current_view', event.target.id);
    }
});

Template.navbar.events({
    "click .btnDelFolder": function(event) {
        console.log("Delete folder");
        Meteor.call('removeFolder', Session.get('current_folder'));
        Session.set('current_folder', 'Select...');
    },

    ENTER: 13,

    'keyup .folderRename': function(event) {
        console.log(event.keyCode);
        if (event.keyCode === 13) {
            event.stopPropagation();
            var folder = event.currentTarget.value;
            Meteor.call('renameFolder',
                        Session.get('current_folder'),
                        folder);
            console.log('Moved to ' + folder);
            Session.set('current_folder', folder);
            event.currentTarget.value = "";
        }
    }
});

Template.panel.helpers({
    mailsView: function() {
        return Session.get('current_view') === 'all_mails';
    }
});

Template.currentfolder.helpers({
    name: function() {
        return Session.get('current_folder');;
    }
});

Template.mail.helpers({
    selected: function(id) {
        if (id == Session.get('current_mail')) {
            return Session.get('current_mail');
        }
        return null;
    }
});

Template.mail.events({
    'click .btnMailDelete': function(event) {
        console.log("Deleting mail " + Session.get('current_mail'));
        // Not working. Why? Oh, issue was related to the id/ObjectID-thing.
        /*
        Mails.remove(Session.get('current_mail'), function(err, count) {
            console.log(err);
            console.log("Removed " + count);
        });
         */
        var id = new Meteor.Collection.ObjectID(Session.get('current_mail'));
        Meteor.call('remove', id, function(err, res) {
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
            var folder = event.currentTarget.value;
            Meteor.call('move',
                        new Meteor.Collection.ObjectID(Session.get('current_mail')),
                        folder);
            console.log('Moved to ' + folder);
        }
    },

    // prevent toggling of mailview
    'click .inputMoveMail': function(event) {
        event.stopPropagation();
    }
});

Template.folder.events({
    'click': function(event) {
        var folder = event.currentTarget.innerHTML;
        console.log(folder);
        Session.set('current_folder', folder);
    }
});

// The form to add a mail
Template.addMailForm.events({
    'submit form': function(event) {

        if (event.type === 'submit') {
            console.log(event.type);
            // don't refresh page on submit
            event.preventDefault();

            var id = new Meteor.Collection.ObjectID();
            var sender = event.target.from.value;
            var recipient = event.target.to.value;
            var subject = event.target.subject.value;
            var text = event.target.text.value;
            var folder = Session.get('current_folder');
            console.log(id + ' ' + sender + ' ' + recipient + ' ' +
                        subject + ' ' + folder + ' ' + text);
            Meteor.call('create', id, sender, recipient, subject,
                        folder, text);
            Session.set('current_view', 'all_mails');
        }
    }
});
