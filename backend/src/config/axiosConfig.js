const axios = require('axios');

const axiosConfig = axios.create({
    baseURL: 'https://api.github.com/users/',
    timeout: 1000
});

module.exports = axiosConfig;
