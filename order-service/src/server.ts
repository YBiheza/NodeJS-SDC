import 'dotenv/config'
import Fastify from 'fastify'
import { OrderPizzaRepository } from './repositories/OrderPizzaRepository'
import { OrderPizzaService } from './services/OrderPizzaService'
import { DataBaseResponse, DeletedOrder, MarkOrderReadyResponse } from '@pizza/api-contract'
import { ProductionClient } from './clients/ProductionClient'
import { OrderPizzaController } from './controllers/OrderPizzaController'
import { Neo4jService } from '../../neo4j/neo4j.service'
import { request } from 'node:http'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

const neo = new Neo4jService()
const prodClient = new ProductionClient()
const orderPizzaRepo = new OrderPizzaRepository(neo)
const orderPizzaService = new OrderPizzaService(orderPizzaRepo, prodClient)
const orderPizzaController = new OrderPizzaController(orderPizzaService)

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
  return orderPizzaController.RegisterNewPizza(request, reply)
})

fastify.patch('/orders/ready', async (request, reply) => {
  const result = await orderPizzaController.UpdateStatus(request, reply)

  return reply.send({
    success: true,
    pizza: result,
  } satisfies MarkOrderReadyResponse)
})

fastify.delete('/deleting', async (request, reply) => {
  const answer = await orderPizzaController.DeleteOrder(request, reply)

  return reply.send({
    success: answer, 
  } satisfies DeletedOrder )
})

fastify.listen({ port: 3001 }).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})
export default fastify
