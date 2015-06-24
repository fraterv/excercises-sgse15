var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var MailAppDispatcher = require('../dispatcher/MailAppDispatcher');
var ActionTypes = require('../constants').ActionTypes;
var Http = require('../http');

// module-private variables and functions

var host = 'http://localhost:3000'; // data backend

var CHANGE_EVENT = 'change';

var _currentMail = {subject:""} // currently selected mail
var _currentFolder = "" // currently opened folder
var _folders = {}; // all available folders
var _mails = {}; // all mails of current folder

// exported module

var EnronStore = assign({}, EventEmitter.prototype, {
    getAllFolders: function() {
        console.log("EnronStore::getAllFolders");
        return _folders;
    },

    getCurrentFolder: function() {
        console.log("EnronStore::getCurrentFolders");
        return _currentFolder;
    },

    getCurrentMail: function() {
        console.log("EnronStore::getCurrentMail");
        return _currentMail;
    },

    getAllMails: function() {
        console.log("EnronStore::getAllMails");
        return _mails;
    },

    emitChange: function() {
        console.log("EnronStore::emitChange");
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        console.log("EnronStore::addChangeListener");
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        console.log("EnronStore::removeChangeListener");
        this.removeListener(CHANGE_EVENT, callback);
    }
});


//
// register the store in the dispatcher to receive a callback
// whenever an action is propagated from elsewhere (i.e. the views)
//
EnronStore.dispatchToken = MailAppDispatcher.register(
    function(action) {
        switch(action.type) {
            case ActionTypes.FOLDER_DELETE:
            var folder = action.folder;
            console.log("EnronStoreCB::DeletingFolder " + folder);
            EnronStore.emitChange();

            break;
            case ActionTypes.FOLDER_OPEN:
            var folder = action.folder;
            _currentFolder = folder;
            console.log("EnronStoreCB::OpenFolder " + folder);
            Http.folderGetMails(folder, function(mails) {
                _mails = mails.map(function(mail) {
                               return {id: mail._id, mail: mail};
                           });
//                console.log("Received mails: " + _mails);
                EnronStore.emitChange();
            });

            break;

            case ActionTypes.FOLDER_LOAD_ALL:
            var folder = action.folder;
            console.log("EnronStoreCB::FolderLoadAll");
            Http.folderGetAll(function(folders) {
                _folders = folders.map(function(folder) {
                               return {id: folder, text: folder};
                           });
//                console.log("Received folders: " + _folders);
                EnronStore.emitChange();
            });

            case ActionTypes.MAIL_OPEN:
            var mail = action.id;
            console.log("EnronStoreCB::MailOpen");
            Http.mailOpen(mail, function(mail) {
                if (mail.length) {
                    _currentMail = mail[0];
                }
                console.log("Received mail: " + mail);
                EnronStore.emitChange();
            });

            break;
            default:
            console.log("EnronStoreCB::Default");
            break;
        }

        // no error - needed by dispatcher
        return true;
    });

module.exports = EnronStore;
