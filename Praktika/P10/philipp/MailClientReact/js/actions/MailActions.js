var MailAppDispatcher = require('../dispatcher/MailAppDispatcher');
var ActionTypes = require('../constants').ActionTypes;

module.exports = {
    openMail: function(id) {
        console.log("MailActions::OpenMail " + id);
        MailAppDispatcher.dispatch({
            type: ActionTypes.MAIL_OPEN,
            id: id
        });
    }
};
