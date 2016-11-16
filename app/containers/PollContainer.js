var React = require('react');
var api = require('../helpers/pollHelpers');

function Poll(props) {
    return (
        <p>Specific Poll</p>
    );    
}

var PollContainer = React.createClass({
    getInitialState: function () {
        return {
            poll: null
        }
    },
    componentDidMount: function() {
        this.callPoll(this.props.routeParams.id);
    },
    componentWillReceiveProps: function(nextprops) {                
        this.callPoll(nextprops.routeParams.id);
    },
    callPoll: function(id) {
        api.getPoll(id)
        .then(result => {            
            this.setState({
                poll: result ? result.data : undefined
            });
        });
    },
    render: function () {
        return this.state.poll? <Poll /> : <p>Poll Not Found </p>;
    }
});

module.exports = PollContainer;