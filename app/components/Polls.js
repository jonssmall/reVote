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
        <div>
            <h1>Polls</h1>
            {pollsArray}
            <br/>
            {newPoll}
        </div>
    )
}

module.exports = Polls;