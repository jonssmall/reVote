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
    render: function () {
        return ( //how to prevent redundant /api/polls calls
            this.props.children || <Polls pollsData={this.state.polls} />                    
        )
    }
});

module.exports = PollsContainer;