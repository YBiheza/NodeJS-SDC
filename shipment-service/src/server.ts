import 'dotenv/config'
import Fastify from 'fastify'
import { ShipmentRepository } from "./repositories/ShipmentRepository"
import { ShipmentService } from "./services/ShipmentService"
import { ShipmentController } from './controllers/ShipmentController'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

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

try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
export default fastify