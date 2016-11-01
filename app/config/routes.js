var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../containers/Main');
var HomeContainer = require('../containers/HomeContainer');
var LoginContainer = require('../containers/LoginContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>        
      <IndexRoute component={HomeContainer} />
      <Route path='login' component={LoginContainer} />
    </Route>
  </Router>
);

module.exports = routes;