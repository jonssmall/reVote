var React = require('react');
var Polls = require('../components/Polls')
var api = require('../helpers/pollHelpers');

var PollsContainer = React.createClass({
    getInitialState: function() {
        return {
            polls: []            
        }
    },
    componentDidMount: function() {
        this.getPolls();             
    },
    //Inefficiency in edge case: direct nav to /polls/id or /polls/new makes unecessary api call.
    getPolls: function() {                 
        api.getPolls()
        .then(result => {            
            if(result.data) {
                this.setState({
                    polls: result.data
                });
            }
        });
    },    
    makeChildObj: function() {
        return React.cloneElement(this.props.children, {signedOn: this.props.signedOn});
    },
    render: function () {
        var guts = this.props.children ? this.makeChildObj() : <Polls signedOn={this.props.signedOn} pollsData={this.state.polls} />                  
        return guts;                        
    }
});

module.exports = PollsContainer;