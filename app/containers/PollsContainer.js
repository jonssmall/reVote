var React = require('react');

var polls = <div>
                <p>Polls Container</p>                
            </div>;

var PollsContainer = React.createClass({    
    render: function () {
        return (
            this.props.children || polls                        
        )
    }
});

module.exports = PollsContainer;