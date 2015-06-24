var MailAppDispatcher = require('../dispatcher/MailAppDispatcher');
var ActionTypes = require('../constants').ActionTypes;

module.exports = {
    showFolders: function(folder) {
        MailAppDispatcher.dispatch({
            type:ActionTypes.UI_SHOW_FOLDERS
        });
    },

    deleteFolder: function(folder) {
        MailAppDispatcher.dispatch({
            type:ActionTypes.FOLDER_DELETE,
            folder: folder
        });
    },

    openFolder: function(folder) {
        console.log("FolderActions::OpenFolder " + folder);
        MailAppDispatcher.dispatch({
            type: ActionTypes.FOLDER_OPEN,
            folder: folder
        });
    },

    loadAll: function() {
        console.log("FolderActions::LoadAll");
        MailAppDispatcher.dispatch({
            type: ActionTypes.FOLDER_LOAD_ALL
        });
    }
};
