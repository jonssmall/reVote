var React = require('react');
var Link = require('react-router').Link;

function Profile (props) {    
    var output = null;
    if(props.user) {
        var polls = props.polls.map(function(poll) {
            return (
                <div key={poll._id}>
                    <Link to={`/polls/${poll._id}`}>{poll.title}</Link>
                    <button onClick={props.delete.bind(null, poll._id)}>Delete</button>
                </div>
            );
        });
        output = (
            <div className="demo-container mdl-grid">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
                <div className="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
                    <h1>Welcome {props.user.displayName}</h1>
                    <h3>Your polls:</h3>         
                    {polls}
                </div>                  
                <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
            </div>
        ); 
    }
     return output;
}

module.exports = Profile;