const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('', userController.addFavoriteUser);
userRouter.get('', userController.getFavoriteUsers);
userRouter.delete('/:username', userController.deleteFavoriteUser);
userRouter.patch('/:username/toggle_star', userController.toggleStar);

module.exports = userRouter;
