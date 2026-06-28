import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import fastify from '../../server.js';

test('products controller should reply with 200', async () => {
    await fastify.ready();

    const response = await request(fastify.server)
    .post('/getproducts')
    .send({
        product: 'Peperoni',
        quantity: 3
    });
    assert.strictEqual(response.statusCode, 200);
});

test('products controller should reply with 400', async () => {
    await fastify.ready();

    const response = await request (fastify.server)
    .post('/getproducts')
    .send({
        product: 'Tomato'
    });

    assert.strictEqual(response.statusCode, 400)
});