import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import fastify from '../server.js';

test('should reply with 200', async () => {
    const response = await request(fastify.server)
    .post('/orderpizza')
    .send({
        pizzaName: 'Peperoni',
        pizzaSize: 'small',
        quantity: 3
    });
    assert.strictEqual(response.statusCode, 200);
});

test('should reply with 400', async () => {
    const response = await request (fastify.server)
    .post('/orderpizza')
    .send({});

    assert.strictEqual(response.statusCode, 400)
});

test('should reply with 200', async () => {
    const response = await request (fastify.server)
    .get('/health')

    assert.strictEqual(response.statusCode, 200);

    assert.strictEqual(response.text, 'OK');

})

//в разные файлы
//обещание, что тебе вернут значение