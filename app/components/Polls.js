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
    
    //todo: hide new poll link now that signedOn is a child prop.
    return (
        <div>
            <h1>Polls</h1>
            {pollsArray}
            <br/>        
            <Link to="/polls/new">New Poll</Link>
        </div>
    )
}

module.exports = Polls;