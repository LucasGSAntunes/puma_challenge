describe('axiosConfig', () => {
    it('should return axios instance', () => {
        const axios = require('../../../config/axiosConfig');
        expect(axios.defaults.baseURL).toBe('https://api.github.com/users/');
        expect(axios.defaults.timeout).toBe(1000);
    });
});
