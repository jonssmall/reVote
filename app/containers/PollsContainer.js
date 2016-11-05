var React = require('react');

var PollsContainer = React.createClass({
    render: function () {
        return (
            <div>
                <p>Polls Container</p>
                {this.props.children}
            </div>
            
        )
    }
});

module.exports = PollsContainer;