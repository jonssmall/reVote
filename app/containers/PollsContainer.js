var React = require('react');
var Polls = require('../components/Polls')

var PollsContainer = React.createClass({    
    render: function () {
        return (
            this.props.children || <Polls/>                    
        )
    }
});

module.exports = PollsContainer;