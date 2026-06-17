import 'dotenv/config'
import Fastify, { FastifyRequest, FastifyReply } from 'fastify'
import type { AvailabilityRequest, DataBaseResponse, PizzaOrder } from '@pizza/api-contract'
import { ProductionService } from './services/PizzaProductionService'
import { ProductionRepository } from './repositories/ProductionRepository'
import { ProductionController } from './controllers/PizzaProductionController'
import { AvailabilityResponse } from '@pizza/api-contract'
import { Neo4jService } from '../../neo4j/neo4j.service'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request: FastifyRequest, reply: FastifyReply) {
  return { hello: 'world' }
})

const neo = new Neo4jService()
const productionRepo = new ProductionRepository(neo)
const productionService = new ProductionService(productionRepo)
const productionController = new ProductionController(productionService)

fastify.post('/availability', async (request: FastifyRequest, reply: FastifyReply) => {
  return productionController.CheckingAvailability(request, reply)
})

fastify.post('/produce', async (request: FastifyRequest, reply: FastifyReply) => {
  return productionController.producePizza(request, reply)
})

fastify.listen({ port: 3000 }).catch((err) => {
  fastify.log.error(err)
  process.exit(1)
})

export default fastify