import { OrderPizzaRepository } from '../repositories/OrderPizzaRepository'
import type { PizzaOrder, MarkOrderReadyRequest, MarkOrderReadyResponse } from '@pizza/api-contract/index'
import { ProductionClient } from '../clients/ProductionClient'

export class OrderPizzaService {
  constructor(private readonly orderRepo: OrderPizzaRepository,
  private readonly productionClient: ProductionClient
) {}
  
  async RegisterPizza (pizza: PizzaOrder): Promise<MarkOrderReadyResponse> {

    const response = await this.productionClient.CheckAvailability(pizza)

      if (!response.available) {
        throw new Error ('Not enough ingredients')
      }

    const newPizza = await this.orderRepo.create(pizza)
    
    if (!newPizza) {
      throw new Error('Pizza was not created')
    }

    const isReady = await this.productionClient.MakePizza(newPizza)

    return isReady
  }

  async updateOrder(data: MarkOrderReadyRequest) {
    return await this.orderRepo.markAsReady(data)
  }
}