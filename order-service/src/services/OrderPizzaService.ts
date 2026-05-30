import { OrderPizzaRepository } from '../repositories/OrderPizzaRepository'
import type { PizzaOrder, DataBaseResponse, MarkOrderReadyRequest } from '@pizza/api-contract/index'
import { ProductionClient } from '../clients/ProductionClient'

export class OrderPizzaService {
  constructor(private repo: OrderPizzaRepository,
  private productionClient: ProductionClient
) {}
  
  async RegisterPizza (pizza: PizzaOrder): Promise<DataBaseResponse> {

    const newPizza = await this.repo.create(pizza)
    if (!newPizza) {
      throw new Error('Pizza was not created')
    }
    return newPizza
  }

  async updateOrder(data: MarkOrderReadyRequest) {
    return await this.repo.markAsReady(data)
  }
}