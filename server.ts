import 'dotenv/config'
import Fastify from 'fastify'
import { ShipmentRepository } from "./src/repositories/ShipmentRepository"
import { ShipmentService } from "./src/services/ShipmentService"
import { ShipmentController } from './src/controllers/ShipmentController'
/*import { registerHealthCheckController } from './src/controllers/HealthCheckController'
import { orderPizza } from './src/controllers/PizzaOrderingController'
import { getOrder } from './src/controllers/PizzaOrderingController'*/

import { OrderService } from './src/services/OrderService'
import type { IOrder } from './src/interfaces/IOrder'
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
const shRepo = new ShipmentRepository()
const shService = new ShipmentService(shRepo)
const shController = new ShipmentController(shService)

fastify.post('/shipment', {
  schema: {
    body: {
      type: 'object',
      required: ['targetWarehouse', 'ingredients', 'date'],
      properties: {
        targetWarehouse: {type: 'string',
        enum: ['north', 'south', 'east', 'west'],
        },
        ingredients: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'unit'],
            properties: {
              id: {type: 'string'},
              unit: {type: 'number', minimum: 1}
            }
          }
        },
        date: { type: 'string', format: 'date-time'}
      }, 
    }
  }
}, async (req, res) => {
  shController.create(req, res)
})
const orderRepo = new OrderRepository()
const orderServ = new OrderService(orderRepo)
const orderController = new OrderController(orderServ)

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