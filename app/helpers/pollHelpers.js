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
    return axios.all([
        axios.get(`/api/polls/${id}`),
        axios.get(`/api/polls/${id}/didVote`)
    ]).then(axios.spread(function (poll, voted) {        
        return {
            poll: poll.data,
            voted: voted.data
        }
    })).catch(error => {
        console.log(error);
    })                
}

function createPoll (pollObject) {
    return axios.post('/api/polls/', pollObject)
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });
}

function deletePoll (id) {
    return axios.delete(`/api/polls/${id}`)
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });
}

function incrementVote (pollId, optionId) {      
    return axios.get(`/api/polls/${pollId}/options/${optionId}`)
        .then(response => {            
            return response
        }).catch(error => {            
            return error.response.data;
        });
}

function newOption (pollId, optionText) {      
    return axios.get(`/api/polls/${pollId}/options/new/${optionText}`)
        .then(response => {            
            return response
        }).catch(error => {            
            return error.response.data;
        });
}

function didVote(pollId) {
    console.log("calling endpoint");
    return axios.get(`/api/polls/${pollId}/didVote`)
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
    deletePoll: deletePoll,
    incrementVote: incrementVote,
    newOption: newOption,
    didVote: didVote
};