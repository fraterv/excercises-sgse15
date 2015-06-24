var MailAppDispatcher = require('../dispatcher/MailAppDispatcher');
var ActionTypes = require('../constants').ActionTypes;

module.exports = {
    openMail: function(id) {
        console.log("MailActions::OpenMail " + id);
        MailAppDispatcher.dispatch({
            type: ActionTypes.MAIL_OPEN,
            id: id
        });
    },
    deleteMail: function(id) {
        console.log("MailActions::DeleteMail " + id);
        MailAppDispatcher.dispatch({
            type: ActionTypes.MAIL_DELETE,
            id: id
        })
    },
    moveMail: function(id, folder) {
        console.log("MailActions::MoveMail " + id + "->" + folder);
        MailAppDispatcher.dispatch({
            type: ActionTypes.MAIL_MOVE,
            id: id,
            folder: folder
        })
    }
};
