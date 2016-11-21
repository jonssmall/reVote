let axios = require('axios');

function getPolls () {
    return axios.get('/api/polls')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });    
}

//  /api/polls/58295aa650e052443f42914a
function getPoll (id) {      
    return axios.get(`/api/polls/${id}`)
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

function incrementVote (pollId, optionId) {      
    return axios.get(`/api/polls/${pollId}/options/${optionId}`)
        .then(response => {            
            return response
        }).catch(error => {            
            return error.response.data;
        });
}

module.exports = {
    getPolls: getPolls,
    getPoll: getPoll,
    createPoll: createPoll,
    incrementVote: incrementVote
};