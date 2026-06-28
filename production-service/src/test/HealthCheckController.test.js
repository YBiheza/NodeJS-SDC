import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import fastify from '../server.js';

test('healthcheck should reply with 200', async () => {
    await fastify.ready();
    const response = await request (fastify.server)
    .get('/health')

    assert.strictEqual(response.statusCode, 200)

    assert.strictEqual(response.text, 'OK')
})