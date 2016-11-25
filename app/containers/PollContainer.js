var React = require('react');
var api = require('../helpers/pollHelpers');

function Poll(props) {        
    let newOption = null;
    let votedToggle = null;    
    if (props.signedOn && !props.alreadyVoted) {
        newOption = (
            <div>
                <input  onChange={props.updateNewOption}
                        value={props.newOption}                         
                        type="text" />
                <button onClick={props.submitNewOption.bind(null, props.newOption)}>New Option</button>
            </div>
        )
    }    
    let poll = props.pollData;
    let options = poll.options.map(function(option) {
        let voteButton = poll.alreadyVoted ? <button onClick={props.vote.bind(null, option._id)}> Vote </button> : null;
        return (
            <div key={option._id}>
                {option.body} : {option.votes}
                {voteButton}
            </div>
        );
    });
    return (
        <div>
            <h1>{poll.title}</h1>
            {options}
            {newOption}
            {votedToggle}             
        </div>
    );
}

var PollContainer = React.createClass({    
    getInitialState: function () {
        return {
            poll: null,
            userVoted: false,
            newOption: ''            
        }
    },
    componentWillMount: function() {
        console.log("willMount");
        this.callPoll(this.props.routeParams.id);
        this.checkIfVoter(this.props.routeParams.id);
    },    
    callPoll: function(pollId) {
        api.getPoll(pollId)
        .then(result => {
            if(result && result.data) {
                this.setState({
                    poll: result.data
                });
            }            
        });
    },
    checkIfVoter: function(pollId) {        
        api.didVote(pollId)
        .then(result => {
            if(result.data) {
                this.setState({
                    userVoted: result.data
                });
            }        
        });
    },
    handleVote: function(id, e) {           
        api.incrementVote(this.state.poll._id, id)
        .then(result => {            
            if (result.data) {
                this.setState({
                    poll: result.data,
                    userVoted: true
                });
            } else {
                console.log(result);
            }
        });        
    },
    updateNewOption: function(e) {        
        this.setState({
            newOption: e.target.value
        });        
    },
    submitNewOption: function(value, e) {
        api.newOption(this.state.poll._id, value)
        .then(result => {
            if (result.data) {
                this.setState({
                    poll: result.data,
                    userVoted: true
                });
            } else {
                console.log(result);
            }
        });
    },
    render: function () {
        console.log('signedOn ' + this.props.signedOn);        
        var output;
        if(this.state.poll) {
            output = <Poll newOption={this.state.newOption}
                            alreadyVoted={this.state.userVoted}
                            submitNewOption={this.submitNewOption}
                            updateNewOption={this.updateNewOption} 
                            signedOn={this.props.signedOn} 
                            vote={this.handleVote} 
                            pollData={this.state.poll}/>;
        } else {
            output = <p>Poll Not Found </p>;
        }
        return output;
    }
});

module.exports = PollContainer;