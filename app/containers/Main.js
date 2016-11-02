var React = require('react');
var Link = require('react-router').Link;
var auth = require('../helpers/authHelpers');

function Login (props) {
    const Login = <a className="mdl-navigation__link" href="/auth/github">Login</a>;        
    const Logout = <a className="mdl-navigation__link" href="/logout">Logout</a>;
    return props.signedOn ? Logout : Login; 
}

function Profile(props) {
    const url = props.signedOn ? "#/profile" : "/auth/github?target=profile";
    return <a className="mdl-navigation__link" href={url}>Profile</a>;
}

var Main = React.createClass({
    getInitialState: function() {
        return {
            signedOn: false,            
        }
    },
    componentDidMount: function() {
        console.log('booting up');
        auth.isSignedOn()
            .then(result => {
                if(result.data) {
                    this.setState({
                        signedOn: result.data
                    });
                }
            });    
    },
    render: function () {
        return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">   
                    <span className="mdl-layout-title">reVote</span>      
                    <div className="mdl-layout-spacer"></div>      
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <Login signedOn={this.state.signedOn}/>
                        <Profile signedOn={this.state.signedOn}/>                                                
                    </nav>
                </div>
            </header>
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Title</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                </nav>
            </div>
            <main className="mdl-layout__content">
                <div className="page-content">
                    {this.props.children}
                </div>
            </main>
        </div>
        )
    }
});

module.exports = Main;