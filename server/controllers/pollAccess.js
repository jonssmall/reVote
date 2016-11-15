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
            res.send(updatedUser.polls.pop()); //cleaner way to show just the new poll?
        });
    });
};

function getPolls (req, res) {        
    Users.find({}, function(err, users) {
        if (err) throw err;
        var polls = [];        
        users.map(function(user) {
            user.polls.map(function(poll) {
                polls.push(poll);
            });
        });
        res.json(polls)
    });
};

function getPoll (req, res) {            
    Users.findOne({'polls': {$elemMatch: {_id: req.params.id}}}, function (err, user) {
        if (err) throw err;        
        //redundancy is a side effect of nesting polls directly in User schema.
        var poll = user.polls.find(function(el) {
            return el.id == req.params.id
        });
        res.json(poll);
    });
};

module.exports = {
    addPoll: addPoll,
    getPolls: getPolls,
    getPoll: getPoll 
};