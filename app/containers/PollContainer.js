var React = require('react');
var api = require('../helpers/pollHelpers');

function Poll(props) {
    let poll = props.pollData;
    let options = poll.options.map(function(option) {
        return (
            <div key={option._id}>
                {option.body} : {option.votes}
                <button onClick={props.vote.bind(null, option._id)}> Vote </button>
            </div>
        );
    });
    return (
        <div>
            <h1>{poll.title}</h1>
            {options}
        </div>
    );    
}

var PollContainer = React.createClass({
    getInitialState: function () {
        return {
            poll: null,
            userVoted: false
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
            if(result && result.data) {
                this.setState({
                    poll: result.data
                });
            }            
        });
    },
    handleVote: function(id, e) {           
        api.incrementVote(this.state.poll._id, id)
        .then(result => {            
            if (result.data) {
                this.setState({
                    poll: result.data
                });
            } else {
                console.log(result);
            }
        });        
    },
    render: function () {
        return this.state.poll? <Poll vote={this.handleVote} pollData={this.state.poll}/> : <p>Poll Not Found </p>;
    }
});

module.exports = PollContainer;