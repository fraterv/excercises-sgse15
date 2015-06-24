var React = require('react');
var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var FolderSection = require('./FolderSection.react');
var MailSection = require('./MailSection.react');
var EnronStore = require('../stores/EnronStore');

var _folder = null;

function getAppState() {
    console.log("MailApp::getAppState");
    return {
        folders: [{id: "A", text: "A"}, {id: "B", text: "B"}],//EnronStore.getAllFolders(),
        mails: EnronStore.getAllMails(_folder)
    };
}

var MailApp = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    // public API
    getInitialState: function() {
        console.log("MailApp::getInitialState");

        // Invariant Violation: must return an object or null...
        return null;
    },

    //
    // lifecycle methods
    //

    componentWillMount() {
        ThemeManager.setTheme(ThemeManager.types.LIGHT);
    },

    componentDidMount: function() {
        console.log("MailApp::componentDidMount");
        EnronStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        console.log("MailApp::componentWillUnmount");
        EnronStore.removeChangeLister(this._onChange);
    },

    //
    // @return {object}
    //
    render: function() {
        return (
            <div>
                <FolderSection />
                <MailSection />
            </div>
        );
    },

    //
    // event handler
    //

    _onChange: function() {
        console.log("MailApp::_onChange");
        this.setState(getAppState());
    }

});


module.exports = MailApp;
