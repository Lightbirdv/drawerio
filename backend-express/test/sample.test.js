const request = require('supertest');
const app = require('../src/app.js');
const pool = require('../src/queries.js');

describe('Sample Test', () => {
    test('should respond with a 200 status code', () => {
        return request(app)
            .get('/test')
            .then(response => {
                expect(response.status).toBe(200);
            })
    });
})

describe('Create a User', () => {
    test('should respond with a 201 status code and a token', async () => {
        return request(app)
            .post('/user/register')
            .send({
                email: 'test@jest.de',
                password: 'test'
            })
            .then(response => {
                expect(response.status).toBe(201);
            })
    })

    // test('should respond with a 201 status code and a token', async () => {
    //     return request(app)
    //         .delete('/user/register')
    //         .send({
    //             email: 'test@jest.de',
    //             password: 'test'
    //         })
    //         .then(response => {
    //             expect(response.status).toBe(201);
    //         })
    // })

})