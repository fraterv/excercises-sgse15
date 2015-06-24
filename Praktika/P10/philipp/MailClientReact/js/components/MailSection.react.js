var React = require('react');

var mui = require('material-ui');
var AppCanvas = mui.AppCanvas;
var List = mui.List;
var ListItem = mui.ListItem;
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;

var EnronStore = require('../stores/EnronStore');
var MailActions = require('../actions/MailActions');

function getStateFromStore() {
    return {
        currentFolder: EnronStore.getCurrentFolder(),
        mails: EnronStore.getAllMails(),
        currentMail: EnronStore.getCurrentMail()
    };
}

var MailSection = React.createClass({

    closeMail: function () {},
    mailViewActions : [
        { text: 'Ok' },
        { text: 'Delete', onTouchTap: this.closeMail,
          ref: 'submit' }
    ],

    getInitialState : function() {
        return getStateFromStore();
    },

    componentDidMount: function() {
        console.log("MailSection::componentDidMount");
        this.setState({currentFolder: [], mails: [],
                       currentMail: {subject: ""}});
        EnronStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        console.log("MailSection::componentWillUnmount");
        EnronStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        console.log("MailSection::onChange");
        this.setState(getStateFromStore());
        if (this.showMail) {
            this.state.showMail = false;
            this.refs.showMailDialog.show();
        }
    },

    test: function(id) {
        this.showMail = true;
        console.log(id.id);
        MailActions.openMail(id.id);
    },

    render: function() {
        var items = [];
        for (var i in this.state.mails) {
            var id = this.state.mails[i].id;
            var sender = this.state.mails[i].mail.sender;
            var date = this.state.mails[i].mail.date;
            var subject = this.state.mails[i].mail.subject;
            var that = this; // pass this to callback
            items.push(<ListItem secondaryText={subject}
                        onClick={function() {that.test({id})}}
                        key={id}>{sender}</ListItem>);
        }
        return (
            <div>
                <Dialog title={this.state.currentMail.subject}
                        actions={this.mailViewActions}
                        ref="showMailDialog"
                        modal={true}>
                 {this.state.currentMail.text}
                </Dialog>
                <List>{items}</List>
            </div>
        );
    }
});

module.exports = MailSection;
