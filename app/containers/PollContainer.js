var React = require('react');
var ReactDOM = require('react-dom');
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
        let voteButton = !props.alreadyVoted ? <button onClick={props.vote.bind(null, option._id)}> Vote </button> : null;
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
            newOption: '',
            domRef: null,          
        }
    },
    componentWillMount: function() {        
        this.callPoll(this.props.routeParams.id);
    },
    componentDidMount: function(){
        if(this.state.poll) this.drawChart();        
    },
    componentDidUpdate: function(){
        if(this.state.poll) this.drawChart();
    },
    callPoll: function(pollId) {
        api.getPoll(pollId)
        .then(result => {
            if(result) {
                this.setState({
                    poll: result.poll,
                    userVoted: result.voted
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
    drawChart: function() {
        let domNode;
        let chartData = [
            ['Option', 'Votes']
        ];              
        let options = this.state.poll.options.map(function(option) {
            chartData.push([option.body, option.votes]);        
        });
        let chart = new google.visualization.PieChart(document.getElementById('poll-chart'));
        chart.draw(google.visualization.arrayToDataTable(chartData), {title: this.state.poll.title});
    },
    render: function () {                  
        var output = null;
        if(this.state.poll) {
            output = (
                <div>
                    <Poll newOption={this.state.newOption}
                            alreadyVoted={this.state.userVoted}
                            submitNewOption={this.submitNewOption}
                            updateNewOption={this.updateNewOption} 
                            signedOn={this.props.signedOn} 
                            vote={this.handleVote} 
                            pollData={this.state.poll}/>
                    <div id="poll-chart"></div>
                </div>
            );
        } //else loading spinner?
        return output;
    }
});

module.exports = PollContainer;