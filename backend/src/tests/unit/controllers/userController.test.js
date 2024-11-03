const userController = require('../../../../src/controllers/userController');
const userService = require('../../../../src/services/userService');
const httpMocks = require('node-mocks-http');

jest.mock('../../../../src/services/userService');

describe('UserController', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    describe('addFavoriteUser', () => {
        it('should add a favorite user and return 201 status', async () => {
            req.body = { username: 'testuser' };
            userService.addFavoriteUser.mockResolvedValue({ username: 'testuser' });

            await userController.addFavoriteUser(req, res, next);

            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toEqual({ username: 'testuser' });
        });

        it('should handle errors and return 400 status', async () => {
            req.body = { username: 'testuser' };
            userService.addFavoriteUser.mockRejectedValue(new Error('Error adding user'));

            await userController.addFavoriteUser(req, res, next);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ success: false, message: 'Error adding user' });
        });
    });

    describe('getFavoriteUsers', () => {
        it('should get favorite users and return 200 status', async () => {
            userService.getFavoriteUsers.mockResolvedValue([{ username: 'testuser' }]);

            await userController.getFavoriteUsers(req, res, next);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual([{ username: 'testuser' }]);
        });

        it('should handle errors and return 400 status', async () => {
            userService.getFavoriteUsers.mockRejectedValue(new Error('Error fetching users'));

            await userController.getFavoriteUsers(req, res, next);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ success: false, message: 'Error fetching users' });
        });
    });

    describe('deleteFavoriteUser', () => {
        it('should delete a favorite user and return 200 status', async () => {
            req.params = { username: 'testuser' };
            userService.deleteFavoriteUser.mockResolvedValue({ username: 'testuser' });

            await userController.deleteFavoriteUser(req, res, next);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ username: 'testuser' });
        });

        it('should handle missing username and return 400 status', async () => {
            req.params = {};

            await userController.deleteFavoriteUser(req, res, next);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Nome de usuário é obrigatório' });
        });

        it('should handle errors and return 400 status', async () => {
            req.params = { username: 'testuser' };
            userService.deleteFavoriteUser.mockRejectedValue(new Error('Error deleting user'));

            await userController.deleteFavoriteUser(req, res, next);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ success: false, message: 'Error deleting user' });
        });
    });

    describe('toggleStar', () => {
        it('should toggle star for a user and return 200 status', async () => {
            req.params = { username: 'testuser' };
            userService.toggleStar.mockResolvedValue({ username: 'testuser', starred: true });

            await userController.toggleStar(req, res, next);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ username: 'testuser', starred: true });
        });

        it('should handle missing username and return 400 status', async () => {
            req.params = {};

            await userController.toggleStar(req, res, next);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Nome de usuário é obrigatório' });
        });

        it('should handle errors and return 400 status', async () => {
            req.params = { username: 'testuser' };
            userService.toggleStar.mockRejectedValue(new Error('Error toggling star'));

            await userController.toggleStar(req, res, next);

            expect(res.statusCode).toBe(400);
            expect(res._getJSONData()).toEqual({ success: false, message: 'Error toggling star' });
        });
    });
});