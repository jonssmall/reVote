var React = require('react');
var api = require('../helpers/pollHelpers');

function Poll(props) {    
    let newOption = null;
    if (props.signedOn) {
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
            {newOption}                
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
                    poll: result.data
                });
            } else {
                console.log(result);
            }
        });
    },
    render: function () {
        var output;
        if(this.state.poll) {
            output = <Poll newOption={this.state.newOption}
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