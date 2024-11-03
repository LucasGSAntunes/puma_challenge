const request = require('supertest');
const express = require('express');
const userRouter = require('../../routes/userRouter');
const app = express();

app.use(express.json());
app.use(userRouter);

describe('UserController Integration Tests', () => {
    describe('POST /users', () => {
        it('should return 400 if username is not provided', async () => {
            const response = await request(app).post('/users').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Nome de usuário é obrigatório' });
        });

        it('should return 201 and the user if username is provided', async () => {
            const user = { username: 'testuser' };
            const response = await request(app).post('/users').send(user);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(user);
        });

        it('should return 409 if the username already exists', async () => {
            const user = { username: 'testuser' };
            await request(app).post('/users').send(user);
            const response = await request(app).post('/users').send(user);
            expect(response.status).toBe(409);
            expect(response.body).toEqual({ message: 'Usuário já existe' });
        });
    });

    describe('GET /users', () => {
        it('should return 200 and the list of users', async () => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array)); // Certifica-se de que o retorno é um array
        });

        it('should return 400 if there is an error', async () => {
            // Exemplo de como simular um erro
            const response = await request(app).get('/users/favorites');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ success: false, message: 'Error' });
        });
    });

    describe('DELETE /users/:username', () => {
        it('should return 400 if username is not provided', async () => {
            const response = await request(app).delete('/users/');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Nome de usuário é obrigatório' });
        });

        it('should return 200 and the username if deletion is successful', async () => {
            const username = 'testuser';
            const response = await request(app).delete(`/users/${username}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ username });
        });

        it('should return 404 if the user does not exist', async () => {
            const username = 'nonexistentuser';
            const response = await request(app).delete(`/users/${username}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Usuário não encontrado' });
        });
    });

    describe('PUT /users/toggle/:username', () => {
        it('should return 400 if username is not provided', async () => {
            const response = await request(app).put('/users/toggle/');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Nome de usuário é obrigatório' });
        });

        it('should return 200 and the user if username is provided', async () => {
            const username = 'testuser';
            const response = await request(app).put(`/users/toggle/${username}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ username });
        });

        it('should return 404 if there is an error', async () => {
            const username = 'nonexistentuser';
            const response = await request(app).put(`/users/toggle/${username}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ success: false, message: 'Error' });
        });
    });
});