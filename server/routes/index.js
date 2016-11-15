'use strict';

let path = process.cwd();
let pollAccess = require('../controllers/pollAccess')

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/app/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			// res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

    app.route('/signedOn')
        .get(function(req, res) {
            res.send(req.isAuthenticated());
        })

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});	
        
	app.route('/auth/github')
		.get(function(req, res) {
            //forwarding unauthorized user to intended view
            //how to limit this to a single user's auth flow rather than server global?
            if (req.query.target) app.locals.target = req.query.target
            passport.authenticate('github')(req, res);
        });                    

    app.route('/auth/github/callback')
		.get(function(req, res) {            
            const redirect = app.locals.target ? '/#/' + app.locals.target : '/' 
            app.locals.target = null;
            passport.authenticate('github', {
                successRedirect: redirect,
                failureRedirect: redirect //how to handle failure
            })(req, res);
        });
    
    app.route('/api/polls/')
        .get(pollAccess.getPolls)
        .post(isLoggedIn, pollAccess.addPoll);

    app.route('/api/polls/:id')
        .get(pollAccess.getPoll);        
};