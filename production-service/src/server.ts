import 'dotenv/config'
import Fastify from 'fastify'
import type { AvailabilityRequest, PizzaOrder } from '@pizza/api-contract'
/*import { registerHealthCheckController } from './src/controllers/HealthCheckController'
import { orderPizza } from './src/controllers/PizzaOrderingController'
import { getOrder } from './src/controllers/PizzaOrderingController'*/
import { ProductionService } from './services/PizzaProductionService'
import { ProductionRepository } from './repositories/ProductionRepository'
import { ProductionController } from './controllers/PizzaProductionController'
import { OrderingClient } from './clients/OrderClient'
import { AvailabilityResponse } from '@pizza/api-contract'

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

const productionRepo = new ProductionRepository()
const productionService = new ProductionService(productionRepo)
const prodController = new ProductionController(productionService)

fastify.post('/produce', async (request, reply) => {
  const body = request.body as PizzaOrder

  await productionService.produce(body)

  return reply.send({
    success: true,
  })
})

fastify.post('/availability', async (request, reply) => {
  const body = request.body as AvailabilityRequest

  const availability = await productionService.checkAvailability(body)
  console.log('🔥 ORDER SERVICE: AVAILABILITY HIT (production servER')
  console.log(request.body)

  /*if (availability) {
    await fetch('http://localhost:3001/orders/ready', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: body.type,
        amount: body.amount,
      }),
    })
  }*/
  return reply.send({
    available: availability,
  } satisfies AvailabilityResponse)
})

try {
  fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
export default fastify