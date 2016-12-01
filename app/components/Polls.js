var React = require('react');
var Link = require('react-router').Link;

function Polls (props) {
    var pollsArray = props.pollsData.map(function(poll) {
        return (
            <div key={poll._id}>
                <Link to={`/polls/${poll._id}`}>{poll.title}</Link>
            </div>
        );
    });
    var newPoll = props.signedOn ? <Link to="/polls/new">New Poll</Link> : null;
    
    //todo: hide new poll link now that signedOn is a child prop.
    return (        
        <div className="demo-container mdl-grid">
            <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
            <div className="demo-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col">
                <h1>Polls</h1>
                {pollsArray}
                <br/>
                {newPoll}
            </div>                  
            <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
        </div>       
    )
}

module.exports = Polls;