var React = require('react');
var Link = require('react-router').Link;
var auth = require('../helpers/authHelpers');

function Login (props) {            
    const Login = <a className="mdl-navigation__link" href={`/auth/github?target=${props.path.substring(1)}`}>Login</a>;        
    const Logout = <a className="mdl-navigation__link" href="/logout">Logout</a>;
    return props.signedOn ? Logout : Login; 
}

function Profile(props) {
    const url = props.signedOn ? "#/profile" : "/auth/github?target=profile";
    return <a className="mdl-navigation__link" href={url}>Profile</a>;
}

function Polls(props) {
    const url = "#/polls";
    return <a className="mdl-navigation__link" href={url}>Polls</a>;
}

var Main = React.createClass({
    getInitialState: function() {
        return {
            signedOn: false,            
        }
    },
    componentDidMount: function() {        
        auth.isSignedOn()
        .then(result => {
            if(result.data) {
                this.setState({
                    signedOn: result.data
                });
            }
        });        
    },
    componentDidUpdate: function() {        
        var layout = document.querySelector('.mdl-layout');
        var drawer = document.querySelector('.mdl-layout__drawer');
        if(drawer.classList.contains('is-visible')) {
            layout.MaterialLayout.toggleDrawer();
        }        
    },
    render: function () {             
        return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">   
                    <span className="mdl-layout-title">reVote</span>      
                    <div className="mdl-layout-spacer"></div>      
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        <Polls />
                        <Login path={this.props.location.pathname} signedOn={this.state.signedOn}/>
                        <Profile signedOn={this.state.signedOn}/>                                                
                    </nav>
                </div>
            </header>
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Title</span>
                <nav className="mdl-navigation">                    
                    <Polls />
                    <Login path={this.props.location.pathname} signedOn={this.state.signedOn}/>
                    <Profile signedOn={this.state.signedOn}/>                    
                </nav>
            </div>
            <main className="mdl-layout__content">
                <div className="page-content">
                    {React.cloneElement(this.props.children, {
                        signedOn: this.state.signedOn
                    })}
                </div>
            </main>
            <div id="unauth-snackbar" className="mdl-js-snackbar mdl-snackbar">
                <div className="mdl-snackbar__text"></div>
                <button className="mdl-snackbar__action" type="button"></button>
            </div>
        </div>
        )
    }
});

module.exports = Main;