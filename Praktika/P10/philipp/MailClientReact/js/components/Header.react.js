var React = require('react');
var mui = require('material-ui');

var Header = React.createClass({
    setTitle: function(title) {
        this.props.folder = title;
    },

    dummy: function() {
    },

    render: function() {
        return (
            <div>Test</div>
        );
    },
});


module.exports = Header;
