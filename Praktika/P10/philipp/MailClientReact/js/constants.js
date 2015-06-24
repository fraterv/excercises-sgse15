var keyMirror = require('keymirror');

module.exports = {

    // creates constants with value = key
    ActionTypes: keyMirror({
        FOLDER_CREATE: null,
        FOLDER_OPEN: null,
        FOLDER_LOAD_ALL: null,

        MAIL_OPEN: null,
        MAIL_MOVE: null,
        MAIL_DELETE: null
    })
};
