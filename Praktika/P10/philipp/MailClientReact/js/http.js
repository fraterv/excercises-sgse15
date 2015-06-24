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
        $.ajax({
            url: 'http://localhost:3000/api/mails/' + query,
            type: 'PUT',
            success: function(response) {
                console.log("http put: " + response);
            }
        });
    },

    folderDelete: function(folder) {
        console.log("http::folderDelete: " + folder);
        $.ajax({
            url: 'http://localhost:3000/api/mails/' + folder,
            type: 'DELETE',
            success: function(response) {
                console.log("http delete: " + response);
            }
        });
    },

    mailOpen: function(id, cb){
        console.log("http::mailOpen: " + id);
        $.get('http://localhost:3000/mailapi/msg/' + id,
              function(data) {
                  cb(data);
              });
    },

    mailDelete: function(id){
        console.log("http::mailDelete: " + id);
        $.ajax({
            url: 'http://localhost:3000/mailapi/msg/' + id,
            type: 'DELETE',
            success: function(response) {
                console.log("http delete: " + response);
            }
        });
    },

    mailMove: function(id, folder) {
        console.log("http::mailMove: " + id + "->" + folder);
        $.ajax({
            url: 'http://localhost:3000/mailapi/msg/' + id +
                 '?folder=' + folder,
            type: 'PUT',
            success: function(response) {
                console.log("http put: " + response);
            }
        });
    },

    mailCreate: function(folder, sender, recipient, subject) {
        console.log("http::mailCreate: " + folder + "," + sender
                   + "," + recipient + "," + subject);
        $.post('http://localhost:3000/mailapi/msg/' + folder
              + '?s=' + sender + '&r=' + recipient + '&j=' + subject);
    }
};
