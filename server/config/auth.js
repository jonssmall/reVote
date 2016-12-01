'use strict';

let callbackURL = process.env.APP_URL ? process.env.APP_URL + 'auth/github/callback' : process.env.path + 'auth/github/callback';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': 'https://revotefcc.herokuapp.com/auth/github/callback'
	}
};