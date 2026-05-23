import Fastify from 'fastify'
import { OrderService } from './src/services/OrderService'
import type { IOrder } from './src/interfaces/IOrder'
import 'dotenv/config'
import { OrderRepository } from './src/repositories/OrderRepository'
import { OrderController } from './src/controllers/PizzaOrderingController'
const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

/*const orders = [];

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
}*/
const repo = new OrderRepository()
const service = new OrderService(repo)
const orderController = new OrderController(service)

fastify.post('/orderpizza', {
    schema: {
        body: {
            type: 'object',
            required: ['item', 'country', 'price', 'date'], 
            properties: {
              item: {
                  type: 'array',
                  items: {
                      type: 'string'
                  }
              },
              country: {
                    type: 'string',
                    enum: ['US', 'LT', 'BY', 'DE']
                },
              price: {
                type: 'number',
              },
              date: { type: 'string', format: 'date-time'}
            }
        }
    }
}, async (req, res) => {
    return orderController.create(req, res)
  })
try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

export default fastify