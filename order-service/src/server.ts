import 'dotenv/config'
import Fastify from 'fastify'
import { OrderPizzaRepository } from './repositories/OrderPizzaRepository'
import { OrderPizzaService } from './services/OrderPizzaService'
import { PizzaOrder, MarkOrderReadyResponse, MarkOrderReadyRequest } from '@pizza/api-contract'
import { ProductionClient } from './clients/ProductionClient'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

const prodClient = new ProductionClient()
const orderpizzaRepo = new OrderPizzaRepository()
const orderpizzaService = new OrderPizzaService(orderpizzaRepo, prodClient)

fastify.post('/orders', async (request, reply) => {
  const body = request.body as PizzaOrder

  const response = await prodClient.CheckAvailability(body)

  if (!response.available) {
    return reply.status(400).send({
      success: false,
      message: 'Not enough ingredients',
    })
  }

  const order = await orderpizzaService.RegisterPizza(body)
  console.log('ORDERS HIT')
  if (!order) {
    return reply.status(500).send({
      success: false,
      message: 'Order was not created',
    })
  }

  const isReady = await prodClient.MakePizza(order)

  return reply.send({
    success: isReady,
    order,
  })
})

fastify.patch('/orders/ready', async (request, reply) => {
  const body = request.body as MarkOrderReadyRequest
  console.log('READY HIT')
  const result = await orderpizzaService.updateOrder(body)

  return reply.send({
    success: true,
    pizza: result,
  } satisfies MarkOrderReadyResponse)
})


try {
  fastify.listen({ port: 3001 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
export default fastify
