var React = require('react');

var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var AppCanvas = mui.AppCanvas;
var AppBar = mui.AppBar;

var EnronStore = require('../stores/EnronStore');
var FolderActions = require('../actions/FolderActions');

function getStateFromStore() {
    return {
        currentFolder: EnronStore.getCurrentFolder(),
        folders: EnronStore.getAllFolders(),
        mails: EnronStore.getAllMails()
    };
}

var FolderSection = React.createClass({
    showNav: false,

    getInitialState : function() {
        return getStateFromStore();
    },

    componentDidMount: function() {
        console.log("FolderSection::componentDidMount");
        this.setState({folders: [], mails: []});
        EnronStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        console.log("FolderSection::componentWillUnmount");
        EnronStore.removeChangeListener(this._onChange);
    },

    _openFolder: function(event, index, item) {
//    console.log(event); console.log(index); console.log(item);
        FolderActions.openFolder(item.text);
        this._toggleNav();
    },

    _onChange: function() {
        console.log("FolderSection::onChange");
        this.setState(getStateFromStore());
    },

    _toggleNav: function() {
        this.showNav = !this.showNav;
        this.refs.leftNav.toggle();
        console.log("FolderSection::toggleNav:" + this.showNav);
    },

    render: function() {
        return (
            <div>
               <LeftNav docked={this.showNav}
                        ref='leftNav'
                        menuItems={this.state.folders}
                        onChange={this._openFolder} />
               <AppBar title={this.state.currentFolder}
                       iconClassNameRight="muidocs-icon-navigation-expand-more"
                       onLeftIconButtonTouchTap={this._toggleNav}/>
            </div>
        );
    }
});

module.exports = FolderSection;
