const userService = require('../services/userService');

const userController = {
    addFavoriteUser: async (req, res) => {
        try {
            const { username } = req.body;
            const user = await userService.addFavoriteUser(username);
            return res.status(201).json(user);
        } catch (error) {
            console.log(error);
            if (error.message === 'User already exists') {
                return res.status(409).json({ message: 'Usuário já existe' });
            } else if (error.message === 'User not found') {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.status(400).json({ success: false, message: error.message });
        }
    },
    getFavoriteUsers: async (req, res) => {
        try {
            const users = await userService.getFavoriteUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    },
    deleteFavoriteUser: async (req, res) => {
        try {
            const { username } = req.params;
            if (!username) {
                return res.status(400).json({ message: 'Nome de usuário é obrigatório' });
            }
            const user = await userService.deleteFavoriteUser(username);
            return res.status(200).json(user);
        } catch (error) {      
            return res.status(400).json({ success: false, message: error.message });
        }
    },
    toggleStar: async (req, res) => {
        try {
            const { username } = req.params;
            if (!username) {
                return res.status(400).json({ message: 'Nome de usuário é obrigatório' });
            }
            const user = await userService.toggleStar(username);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
};

module.exports = userController;
