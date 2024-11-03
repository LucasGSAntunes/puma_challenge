const userManager = require('../managers/userManager');

const userServices = {
    addFavoriteUser: async (username) => {
        try {
            const user = await userManager.getUserGithub(username);
            await userManager.addFavoriteUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    },

    getFavoriteUsers: async () => {
        try {
            return await userManager.getFavoriteUsers();
        } catch (error) {
            throw error;
        }
    },

    deleteFavoriteUser: async (username) => {
        try {
            return await userManager.deleteFavoriteUser(username);
        }
        catch (error) {
            throw error;
        }
    },

    toggleStar: async (username) => {
        try {
            return await userManager.toggleStar(username);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = userServices;
