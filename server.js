'use strict';

var express = require('express');
var routes = require('./server/routes/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
var router = express.Router({mergeParams: true});
require('dotenv').load();
require('./server/config/passport')(passport);

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/app', express.static(process.cwd() + '/app'));
app.use(router);

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', true);

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});