var React = require('react');
var api = require('../helpers/pollHelpers');

var PollContainer = React.createClass({
    componentDidMount: function() {
        api.getPoll(this.props.routeParams.id)
        .then(result => {
            console.log(result);
            // if(result.data) {
            //     this.setState({
            //         polls: result.data
            //     });
            // }
        });                       
    },
    render: function () {
        return <p>Specific Poll</p>;
    }
});

module.exports = PollContainer;