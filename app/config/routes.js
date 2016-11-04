var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../containers/Main');
var HomeContainer = require('../containers/HomeContainer');
var ProfileContainer = require('../containers/ProfileContainer');
var auth = require('../helpers/authHelpers');

function requireAuth (nextState, replace, callback) {
    auth.isSignedOn()
        .then(result => {
            console.log(result); 
            if(!result.data) {
                console.log('not logged in');
                replace({
                    pathname: '/',
                    state: { nextPathname: nextState.location.pathname }
                });
            }
            callback();
        });
}

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>        
      <IndexRoute component={HomeContainer} />
      <Route path='profile' component={ProfileContainer} onEnter={requireAuth}/>
    </Route>
  </Router>
);

module.exports = routes;