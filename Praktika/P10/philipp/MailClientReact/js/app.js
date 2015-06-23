/** @jsx React.DOM */
var React = require('react');
var MailApp = require('./components/MailApp.react');
var FolderActions = require('./actions/folderActions');

window.React = React; // for the devtools

React.render(
    <MailApp />,
    document.getElementById('mail-app')
);

// This initializes the app by loading all mails,
// resulting in a dispatched message received by EnronStore.
FolderActions.loadAll();
