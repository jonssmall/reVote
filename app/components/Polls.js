var React = require('react');
var Link = require('react-router').Link;

function Polls (props) {
     return (
        <div>
            <p>Polls</p>
            <Link to="/polls/new">New Poll</Link>
        </div>
     )
}

module.exports = Polls;