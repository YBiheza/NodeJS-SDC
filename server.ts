import 'dotenv/config'
import Fastify from 'fastify'
import { ShipmentRepository } from "./src/repositories/ShipmentRepository"
import { ShipmentService } from "./src/services/ShipmentService"
import { ShipmentController } from './src/controllers/ShipmentController'
/*import { registerHealthCheckController } from './src/controllers/HealthCheckController'
import { orderPizza } from './src/controllers/PizzaOrderingController'
import { getOrder } from './src/controllers/PizzaOrderingController'*/

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

//const orders = [];

/*fastify.get('/health', registerHealthCheckController);
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
const repo = new ShipmentRepository()
const service = new ShipmentService(repo)
const shController = new ShipmentController(service)

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
try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
export default fastify