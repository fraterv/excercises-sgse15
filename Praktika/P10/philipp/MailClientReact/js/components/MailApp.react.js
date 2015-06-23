var React = require('react');

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var EnronStore = require('../stores/EnronStore');

var _folder = null;

function getAppState() {
    console.log("MailApp::getAppState");
    return {
        folders: EnronStore.getAllFolders(),
        mails: EnronStore.getAllMails(_folder)
    };
}

var MailApp = React.createClass({

    // public API
    getInitialState: function() {
        console.log("MailApp::getInitialState");
        _folder = EnronStore.getAllFolders();

        // Invariant Violation: must return an object or null...
        return null;
    },

    //
    // lifecycle methods
    //

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
                <Header />
                <MainSection />
                <Footer />
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
