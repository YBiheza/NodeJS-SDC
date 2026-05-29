import 'dotenv/config'
import Fastify from 'fastify'
//import { OrderService } from './services/OrderService'
import type { IOrder } from './interfaces/IOrder'
import { OrderRepository } from './repositories/OrderRepository'
//import { OrderController } from './controllers/OrderingController'
import { OrderPizzaController } from './controllers/OrderPizzaController'
import { OrderPizzaRepository } from './repositories/OrderPizzaRepository'
import { OrderPizzaService } from './services/OrderPizzaService'
import { PizzaOrder, MarkOrderReadyRequest, MarkOrderReadyResponse, AvailabilityRequest, AvailabilityResponse} from '@pizza/api-contract'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

/*const orderRepo = new OrderRepository()
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

fastify.post('/orders/ready', async (req, reply) => {
    return orderController.markReady(req, reply)
})*/

const orderpizzaRepo = new OrderPizzaRepository()
const orderpizzaService = new OrderPizzaService(orderpizzaRepo)
const orderpizzaController = new OrderPizzaController(orderpizzaService)

fastify.post('/newpizza', {
  schema: {
    body: {
      type: 'object',
      required: ['type', 'amount'], 
      properties: {
        type: { type: 'string', 
          enum: ['Margarita', 'Four_seasons', 'Vegetarian', 'Meat_and_mushrooms', 'Chicken_kari'],
         },
        amount: {
          type: 'number',
          minimum: 1,
        },
      },
    },
  },
}, async (req, res) => {
  return orderpizzaController.create(req, res)
})

/*fastify.get('/getready', async (request, reply) => {

  const pizza = await orderpizzaRepo.getReady()
  
  if (!pizza.length) {
    return reply.status(404).send({
      message: 'No ready pizzas',
    })
  }

  return reply.send({
    success: true,
    pizza: pizza,
  })
})*/

fastify.post('/orders', async (request, reply) => {
  const body = request.body as PizzaOrder

  const response = await fetch('http://localhost:3000/availability', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: body.type,
      amount: body.amount,
    } satisfies AvailabilityRequest),
  })

  const data = (await response.json()) as AvailabilityResponse

  if (!data.available) {
    return reply.status(400).send({
      success: false,
      message: 'Not enough ingredients',
    })
  }

  const order = await orderpizzaService.RegisterPizza(body)

  const command = await fetch('http://localhost:3000/produce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: body.type,
      amount: body.amount,
    } satisfies PizzaOrder),
  })

  return reply.send({
    success: true,
    order,
  })
})

fastify.patch('/orders/ready', async (request, reply) => {
  const body = request.body as PizzaOrder
  
  const result = await orderpizzaService.updateOrder(body)
  
  if (!result.length) {
    return reply.status(404).send({
      message: 'Pizza not found',
    })
  }

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
