var MailAppDispatcher = require('./dispatcher/MailAppDispatcher');
var ActionTypes = require('./constants').ActionTypes;

module.exports = {

    folderGetAll: function(cb) {
        console.log("http::folderGetAll");
        $.get('http://localhost:3000/api/mails',
              function(data) {
                  cb(data);
              });
    },

    folderGetMails: function(folder, cb){
        console.log("http::folderGetMails: " + folder);
        $.get('http://localhost:3000/api/mails/' + folder,
              function(data) {
                  cb(data);
              });
    },

    folderRename: function(folder, newname){
        console.log("http::folderRename: " + folder + "->" + newname);
        var query = folder + "?folder=" + newname;
        $.put('http://localhost:3000/api/mails/' + query);
    },

    folderDelete: function(folder) {
        console.log("http::folderDelete: " + folder);
        $.delete('http://localhost:3000/api/mails/' + folder);
    },

    mailDelete: function(id){
        console.log("http::mailDelete: " + id);
        $.delete('http://localhost:3000/mailapi/msg/' + id);
    },

    mailMove: function(id, folder) {
        console.log("http::mailMove: " + id + "->" + folder);
        $.put('http://localhost:3000/mailapi/msg/' + id +
              '?folder=' + folder);
    },

    mailCreate: function(folder, sender, recipient, subject) {
        console.log("http::mailCreate: " + folder + "," + sender
                   + "," + recipient + "," + subject);
        $.post('http://localhost:3000/mailapi/msg/' + folder
              + '?s=' + sender + '&r=' + recipient + '&j=' + subject);
    }
};
