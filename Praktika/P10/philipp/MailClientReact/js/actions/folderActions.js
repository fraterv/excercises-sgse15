var MailAppDispatcher = require('../dispatcher/MailAppDispatcher');
var ActionTypes = require('../constants').ActionTypes;

module.exports = {
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
