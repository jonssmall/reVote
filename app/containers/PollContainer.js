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
            console.log(result);        
            this.setState({
                poll: result ? result.data : undefined
            });
        });
    },
    handleVote: function(id, e) {        
        var newPoll = this.state.poll;
        var newOptions = newPoll.options;
        newOptions.map(function(option) {
            if (option._id == id) option.votes++;
        });        
        newPoll.options = newOptions;
        this.setState({
            poll: newPoll
        });
    },
    render: function () {
        return this.state.poll? <Poll vote={this.handleVote} pollData={this.state.poll}/> : <p>Poll Not Found </p>;
    }
});

module.exports = PollContainer;