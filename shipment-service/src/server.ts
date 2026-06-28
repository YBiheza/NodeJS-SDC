import 'dotenv/config'
import { pgboss } from './jobs/boss'
import Fastify from 'fastify'
import { ShipmentRepository } from "./repositories/ShipmentRepository"
import { ShipmentService } from "./services/ShipmentService"
import { ShipmentController } from './controllers/ShipmentController'
import { registerWorker } from './workers/ExpiredJobWorker'
import cron from 'node-cron';

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

async function startApp () {
  await pgboss.start();
  console.log("Boss started");

  await registerWorker();
  console.log("Worker started");

  cron.schedule('24 21 * * *', async () => {
    await pgboss.send('delete-shipments', {});
  }); 

  fastify.listen({ port: 3002 })
}

startApp().catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})

export default fastify