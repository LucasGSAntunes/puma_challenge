const request = require('supertest');
const express = require('express');
const router = require('../../../../src/routes/router');

const app = express();
app.use(router);

describe('Router', () => {
    it('should initialize userRouter on /api/users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).not.toBe(404);
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown-route');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Route not found' });
    });
});