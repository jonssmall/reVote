'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
        publicRepos: Number
	},
    polls: [{
        title:  String,
	    author: String,	
	    options: [{ body: String, votes: Number }],
	    voters: [{ userId: String, ipAddress: String }]
    }]
});

module.exports = mongoose.model('User', User);