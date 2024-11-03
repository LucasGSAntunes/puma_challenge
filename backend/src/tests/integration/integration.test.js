const request = require('supertest');
const express = require('express');
const router = require('../../routes/router');
const app = express();
const userManager = require('../../managers/userManager');

app.use(express.json());
app.use(router);

describe('UserController Integration Tests', () => {
    describe('POST /users', () => {
        it('should return 400 if username is not provided', async () => {
            const response = await request(app).post('/api/users').send({
                body: {  }
            });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Username is required', success: false });
        });
    });

    describe('GET /users', () => {
        it('should return 200 and the list of users', async () => {
            const response = await request(app).get('/api/users');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe('DELETE /users/:username', () => {
        it('should return 400 if username is not provided', async () => {
            const response = await request(app).delete('/api/users/');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Route not found' });
        });

        it('should return 400 if the user does not exist', async () => {
            const username = 'nonexistentuser';
            const response = await request(app).delete(`/api/users/${username}`);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'User not found', success: false });
        });
    });

    describe('PUT /users/toggle/:username', () => {
        it('should return 400 if username is not provided', async () => {
            const response = await request(app).put('/api/users//toggle_star');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Route not found' });
        });

        it('should return 404 if there is an error', async () => {
            const username = 'nonexistentuser';
            const response = await request(app).put(`/api/users/${username}/toggle_star`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Route not found' });
        });
    });
});