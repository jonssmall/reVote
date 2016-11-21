let axios = require('axios');

function isSignedOn () {
    return axios.get('/signedOn')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });    
}

function getUser () {    
    return axios.get('/profile')
        .then(response => {
            return response
        }).catch(error => {
            console.log(error);
        });
}

module.exports = {
    isSignedOn: isSignedOn,
    getUser: getUser
};