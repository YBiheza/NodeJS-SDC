import Fastify from 'fastify'
import { registerHealthCheckController } from './src/controllers/HealthCheckController.js'
import { orderPizza } from './src/controllers/PizzaOrderingController.js'
import { getOrder } from './src/controllers/PizzaOrderingController.js'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

const orders = [];

fastify.get('/health', registerHealthCheckController);
fastify.post('/orderpizza', {
    schema: {
        body: {
            type: 'object',
            required: ['pizzaName', 'pizzaSize', 'quantity'], 
            properties: {
                pizzaName: {type: 'string'},
                pizzaSize: {
                    type: 'string',
                    enum: ['small', 'medium', 'large']
                },
                quantity: {
                    type: 'number',
                    minimum: 1
                }
            }
        }
    }
}, orderPizza)
fastify.get('/order', getOrder)

try {
  await fastify.listen({ port: 3000 })
  } catch (err) {
      fastify.log.error(err)
      process.exit(1)
  }

export default fastify