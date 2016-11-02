var React = require('react');
var Profile = require('../components/Profile');
var auth = require('../helpers/authHelpers');

var ProfileContainer = React.createClass({
    getInitialState: function() {
        return {                
        }
    },    
    componentDidMount: function() {   
        auth.getUser()
            .then(result => {
                console.log(result);
                if(result.data) {
                    let user = result.data
                    this.setState({
                        displayName: user.displayName,
                        id: user.id,
                        publicRepos: user.publicRepos,
                        username: user.username
                    });
                }
            });      
    },
    render: function () {
        return (
            <div>                
                <Profile displayName={this.state.displayName} />
            </div>
        )
    }
});

module.exports = ProfileContainer;