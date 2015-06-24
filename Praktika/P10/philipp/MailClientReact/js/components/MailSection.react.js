var React = require('react');

var mui = require('material-ui');
var AppCanvas = mui.AppCanvas;
var List = mui.List;
var ListItem = mui.ListItem;
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;
var Checkbox = mui.Checkbox;
var DropDownMenu = mui.DropDownMenu;
var TextField = mui.TextField;
var SelectField = mui.SelectField;
var RaisedButton = mui.RaisedButton;

var EnronStore = require('../stores/EnronStore');
var MailActions = require('../actions/MailActions');
var FolderActions = require('../actions/FolderActions');

function getStateFromStore() {
    return {
        currentFolder: EnronStore.getCurrentFolder(),
        mails: EnronStore.getAllMails(),
        selectedMail: null,
        currentMail: EnronStore.getCurrentMail()
    };
}

var MailSection = React.createClass({
    getDefaultProps: function() {
        return {
            mails: []
        }
    },
    propTypes: {
        mails: React.PropTypes.array
    },
    moveMailTarget: "",
    moveMail: function(event) {
        console.log(this.refs.moveMailField.getValue());
        var id = this.refs.moveMailField.getValue();
        this.refs.moveMailField.setValue("");
        MailActions.moveMail(id, "Test");
        // this then updates the store which will emit a change
        // signal that is received here in _onchange.
    },

    deleteMail: function() {
        // This is not called. Why? Don't know.
        console.log("Deleting " + this.state.selectedMail);
        // Get the id from somewhere, then:
        var id = this.refs.deleteMailField.getValue();
        this.refs.deleteMailField.setValue("");
        MailActions.deleteMail(id);
        // this then updates the store which will emit a change
        // signal that is received here in _onchange.
    },

    deleteFolder: function() {
        console.log("Deleting " + this.state.currentFolder);
        FolderActions.deleteFolder(this.state.currentFolder);
    },

    closeMail: function () {},
    mailViewActions : [
        { text: 'Ok' },
        { text: 'Delete', onClick: this._deleteMail, ref: 'submit' }
    ],

    getInitialState : function() {
        return getStateFromStore();
    },

    componentDidMount: function() {
        console.log("MailSection::componentDidMount");
        this.setState({currentFolder: [],
                       mails: [],
                       selectedMail: null,
                       currentMail: []});
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

    openMail: function(id) {
        this.showMail = true;
        this.state.selectedMail = id;
        console.log(id.id);
        MailActions.openMail(id);
    },

    render: function() {
        this.props.items = this.state.mails;
        var items = [];
        for (var i in this.state.mails) {
            var id = this.state.mails[i].id;
            var sender = this.state.mails[i].mail.sender;
            var date = this.state.mails[i].mail.date;
            var subject = this.state.mails[i].mail.subject;
            items.push(<ListItem secondaryText={subject}
                        onClick={this.openMail.bind(this, id)}
                        key={id}>{sender}</ListItem>);
        }
        console.log(this.props.items);
        return (
            <div>
                <Dialog title={this.state.currentMail.subject}
                        actions={this.mailViewActions}
                        ref="showMailDialog"
                        modal={true}>
                 {this.state.currentMail.text}
                </Dialog>
                <TextField hintText="Move Mails"
                           ref="moveMailField"
                           onEnterKeyDown={this.moveMail}/>
                <TextField hintText="Delete Mail"
                           ref="deleteMailField"
                           onEnterKeyDown={this.deleteMail}/>
                <FlatButton label="Delete Folder"
                            onClick={this.deleteFolder}/>
                <List>
                {items}
                </List>
            </div>
        );
    }
});

module.exports = MailSection;
