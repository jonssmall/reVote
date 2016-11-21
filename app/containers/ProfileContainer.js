var React = require('react');
var Profile = require('../components/Profile');
var auth = require('../helpers/authHelpers');
var api = require('../helpers/pollHelpers');

var ProfileContainer = React.createClass({
    getInitialState: function() {
        return {
            user: undefined,
            polls: undefined
        }
    },    
    componentDidMount: function() {   
        auth.getUser()
            .then(result => {                           
                if(result.data) {
                    let user = result.data.github
                    this.setState({
                        user: user,
                        polls: result.data.polls
                    });                    
                }
            });         
    },
    handleDelete: function(id, e) {        
        api.deletePoll(id)
        .then(result => {
            this.setState({
                polls: result.data
            });    
        });
    },
    render: function () {        
        return (
            <div>                
                <Profile user={this.state.user} polls={this.state.polls} delete={this.handleDelete} />
            </div>
        )
    }
});

module.exports = ProfileContainer;