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
        api.getPoll(this.props.routeParams.id)
        .then(result => {
            console.log(result);
            if(result) {
                this.setState({
                    poll: result.data
                });
            }
        });                       
    },
    render: function () {
        return this.state.poll? <Poll /> : <p>Poll Not Found </p>;
    }
});

module.exports = PollContainer;