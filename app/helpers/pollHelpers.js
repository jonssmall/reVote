let axios = require('axios');

function getPolls () {
    return axios.get('/api/polls')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });    
}

function getPoll (id) {
    return axios.get('/api/polls/:id')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });    
}

function createPoll (pollObject) {
    return axios.post('/api/polls/', pollObject)
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });   
}

function deletePoll() {
    //todo
}

module.exports = {
    getPolls: getPolls,
    getPoll: getPoll,
    createPoll: createPoll
};