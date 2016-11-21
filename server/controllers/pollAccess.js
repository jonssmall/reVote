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
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Users.findOne({'polls': {$elemMatch: {_id: req.params.id}}}, function (err, user) {
            if (err) throw err;        
            //redundancy is a side effect of nesting polls directly in User schema.
            var poll = user.polls.find(function(poll) {
                return poll.id == req.params.id
            });
            res.json(poll);
        });
    } else {
        res.status(404).send('Invalid Poll ID');
    }
};

function deletePoll (req, res) {
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Users.findOne({'polls': {$elemMatch: {_id: req.params.id}}}, function (err, user) {
            if (err) throw err;                                
            user.polls = user.polls.filter(function(poll) {
                return poll.id != req.params.id;
            });
            user.save(function (err, updatedUser) {
                if (err) throw err;
                res.send(updatedUser.polls);
            });
        });
    } else {
        res.status(404).send('Invalid Poll ID');
    }
}

function incrementVote (req, res) {
    // req.params.pollId, req.params.optionId
    if(req.params.pollId.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(`Incoming IP: ${req.ip}`);
        Users.findOne({'polls': {$elemMatch: {_id: req.params.pollId}}}, function (err, user) {
            if (err) throw err;                    
            var poll = user.polls.find(function(poll) {
                return poll.id == req.params.pollId;
            });     

            if(!existingVoter(req, poll.voters)) {
                var option = poll.options.find(function(option) {
                    return option.id == req.params.optionId;
                });
                option.votes++;

                var newVoter = {};
                newVoter.userId = req.session.passport ? req.session.passport.user : 'anonymous';
                newVoter.ipAddress = req.ip;
                poll.voters.push(newVoter);

                user.save(function(err, user) {
                    if (err) throw err;
                    res.json(poll);
                });
            } else {
                res.status(400).send('Error: duplicate voter');
            }            
        });
    } else {
        res.status(400).send('Invalid Poll ID');
    }
};

function existingVoter(req, votersArray) {
    var user = req.session.passport ? req.session.passport.user : undefined;
    return votersArray.some(function(voter) {
        return (voter.userId == user || voter.ipAddress == req.ip); 
    });
}

module.exports = {
    addPoll: addPoll,
    getPolls: getPolls,
    getPoll: getPoll,
    deletePoll: deletePoll,
    incrementVote: incrementVote 
};