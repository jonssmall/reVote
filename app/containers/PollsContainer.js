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
        if(!this.props.children) {            
            api.getPolls()
            .then(result => {
                console.log(result);
                if(result.data) {
                    this.setState({
                        polls: result.data
                    });
                }
            });
        }                    
    },
    //spaghettiesque, how to refactor
    makeChildObj: function() {
        return React.cloneElement(this.props.children, {signedOn: this.props.signedOn});
    },
    render: function () {        
        var guts = this.props.children ? this.makeChildObj() : <Polls pollsData={this.state.polls} />                  
        return guts;                        
    }
});

module.exports = PollsContainer;