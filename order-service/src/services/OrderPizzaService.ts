import { OrderPizzaRepository } from '../repositories/OrderPizzaRepository'
import { TPizza } from '@pizza/api-contract/shared types/TPizza'
//import { ProducePizzaRequest } from '@pizza/api-contract'
//import { OrderingClient } from "../clients/OrderClient"
import type { PizzaOrder, AvailabilityRequest, AvailabilityResponse } from '@pizza/api-contract/index'

export class OrderPizzaService {
  constructor(private repo: OrderPizzaRepository,
    //private orderingClient: OrderingClient
) {}
  
  /*async registerPizza (data: ProducePizzaRequest) {
    if (data.amount <= 0) {
      throw new Error('Invalid amount')
    }

  const available =
  await this.orderingClient.checkAvailability({
    type: data.type,
    amount: data.amount
  })

  if (!available.available) {
  throw new Error('Ingredients unavailable')
}*/
  async RegisterPizza (pizza: PizzaOrder) {
      const response = await fetch ('http://localhost:3000/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: pizza.type,
        amount: pizza.amount
      } satisfies AvailabilityRequest),
    })

    const availability = await response.json() as AvailabilityResponse

    if(!availability) {
      throw new Error ('Ingredients are not available')
    } else {
      const newPizza = this.repo.create(pizza)
      console.log('RESULT from orderservice:', availability, newPizza)
      return newPizza
    }
  }

  /*await this.orderingClient.markOrderReady(data.orderId)
    return pizza
  }*/

  async getPizzaById(id: number) {
    return await this.repo.getById(id)
  }

  async getAllOrders() {
    return await this.repo.getAll()
  }

  async updateOrder(data: PizzaOrder) {
    return await this.repo.markAsReady(data)
  }
}