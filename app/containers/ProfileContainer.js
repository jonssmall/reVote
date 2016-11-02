var React = require('react');
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
                <h1>Welcome {this.state.displayName}</h1>
            </div>
        )
    }
});

module.exports = ProfileContainer;