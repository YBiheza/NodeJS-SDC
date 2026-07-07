import 'dotenv/config'
import PgBoss from 'pg-boss'
import Fastify from 'fastify'
import { OrderPizzaRepository } from './repositories/OrderPizzaRepository'
import { OrderPizzaService } from './services/OrderPizzaService'
import { MarkOrderReadyResponse } from '@pizza/api-contract'
import { ProductionClient } from './clients/ProductionClient'
import { OrderPizzaController } from './controllers/OrderPizzaController'
import { boss } from './jobs/staleOrderJob';
import { registerWorkers } from "./workers/StaleOrderWorker"

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

/*if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

const pgboss = new PgBoss({
  connectionString: process.env.DATABASE_URL
})*/



//runBoss()

const prodClient = new ProductionClient()
const orderPizzaRepo = new OrderPizzaRepository()
const orderPizzaService = new OrderPizzaService(orderPizzaRepo, prodClient, boss)
const orderPizzaController = new OrderPizzaController(orderPizzaService)


/*await job.registerWorker(async (orderId) => {
    console.log('🔥 WORKER STARTED:', orderId)
  await orderPizzaService.markOldOrder(orderId)
})*/



//runWorker()

fastify.post('/orders', {
  schema: {
    body: {
      type: 'object',
      required: ['type', 'amount'],
      properties: {
        type: { 
          type: 'string',
          enum: ['Margarita', 'Four_seasons', 'Vegetarian', 'Meat_and_mushrooms', 'Chicken_kari'],
        },
        amount: {
          type: 'number',
          minimum: 1,
        },
      },
    },
  },
}, async (request, reply) => {
  const order = await orderPizzaController.RegisterNewPizza(request, reply)
  
  /*if (!order?.id) {
    throw new Error ('Server error')
  }
  //await job.register(order.id)
  const jobId = await job.register(order.id)
  console.log('JOB CREATED:', jobId)*/

  return order
})

fastify.patch('/orders/ready', async (request, reply) => {
  const result = await orderPizzaController.UpdateStatus(request, reply)

  return reply.send({
    success: true,
    pizza: result,
  } satisfies MarkOrderReadyResponse)
})

async function StartApp () {
  await boss.start();
  console.log('Boss started');
  await boss.createQueue('check-order-status');
  await registerWorkers();
  console.log('Workers registered');
  await fastify.listen({ port: 3001 })
}

/*fastify.listen({ port: 3001 })*/StartApp().catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
export default fastify

