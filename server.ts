import Fastify from 'fastify'
import { OrderService } from './src/services/OrderService'
import type { IOrder } from './src/interfaces/IOrder'
import 'dotenv/config'
import { OrderRepository } from './src/repositories/OrderRepository'

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
const repo = new OrderRepository()
const service = new OrderService(repo)

const order: IOrder = {
  item: [],
  country: 'BY',
  date: new Date('2026-04-08T15:30:00'),
  price: 501,
}
const id = 1
async function run () {
  //const result = await service.placeOrder(order)
  const resById = await service.GetOrderById(id)
  const allItems = await service.GetAll()
  console.log('Used order ', order)
  //console.log('result from DB (added)', result)
  console.log('result by ID from DB ', resById)
  for (const item of allItems) {
    console.log(`item ${item.id}`, item)
  }
}
run() 
export default fastify