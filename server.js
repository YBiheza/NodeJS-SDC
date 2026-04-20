import Fastify from 'fastify'
import { registerHealthCheckController } from './src/controllers/HealthCheckController.js'
import { getProducts } from './src/controllers/PizzaProductionController.js'
import { putProducts } from './src/controllers/PizzaProductionController.js'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

fastify.get('/health', registerHealthCheckController);
fastify.post('/getproducts', {
    schema: {
        body: {
            type: 'object',
            required: ['product', 'quantity'], 
            properties: {
                product: {type: 'string'},
                quantity: {
                    type: 'number',
                    minimum: 1
                }
            }
        }
    }
}, getProducts)
fastify.get('/putproducts', putProducts)

export default fastify