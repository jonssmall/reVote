'use strict';

var Users = require('../models/users.js');

function addPoll (req, res) {        
    Users.findOne({'github.id': req.user.github.id}, function(err, user) {
        if (err) throw err;
        var newOptions = [];
        for(var option in req.body.options) {
            newOptions.push({body: req.body.options[option], votes: 0});
        }            
        var newPoll = {
            title: req.body.title,
            author: req.user.github.username,
            options: newOptions,
            voters: []
        };
        user.polls.push(newPoll);
        user.save(function (err, updatedUser) {
            if (err) throw err;
            res.send(updatedUser);
        });
    });
};

function getPolls (req, res) {        
    Users.find({}, function(err, users) {
        if (err) throw err;
        var polls = [];
        //console.log(users);
        users.map(function(user) {
            user.polls.map(function(poll) {
                polls.push(poll);
            });
        });
        res.json(polls)
    });
};

module.exports = {
    addPoll: addPoll,
    getPolls: getPolls    
};