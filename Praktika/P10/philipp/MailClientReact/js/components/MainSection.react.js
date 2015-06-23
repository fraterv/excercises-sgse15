var React = require('react');

var EnronStore = require('../stores/EnronStore');

function getStateFromStore(folder) {
    return {
        folders: EnronStore.getAllFolders(),
        mails: EnronStore.getAllMails(folder)
    };
}

var MainSection = React.createClass({

    componentDidMount: function() {
        console.log("MainSection::componentDidMount");
        EnronStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        console.log("MainSection::componentWillUnmount");
        EnronStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        console.log("MainSection::onChange");
        this.setState(getStateFromStore());
    },

    render: function() {
        return (
            <div>Enron Main Section</div>
        );
    }
});

module.exports = MainSection;
