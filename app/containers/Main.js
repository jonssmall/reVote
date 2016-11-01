var React = require('react');
var Link = require('react-router').Link;

function Login (props) {
    var Login = 
        <Link to='login' style={{textDecoration:'none'}}>                  
            <span className="mdl-navigation__link">Login</span>
        </Link>;
    var Logout = <a className="mdl-navigation__link" href="">Logout</a>;
    return props.signedOn ? Logout : Login; 
}

var Main = React.createClass({
    getInitialState: function () {
        return {
            signedOn: false,            
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
                        <Login signedOn={this.state.signedOn}/>                                                
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