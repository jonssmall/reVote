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
    // response.data = {
    //     displayName: "Jon",
    //     id: "123456",
    //     publicRepos: 73,
    //     username: "jonssmall"
    // };
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