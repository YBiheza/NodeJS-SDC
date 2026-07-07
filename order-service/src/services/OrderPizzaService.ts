import { OrderPizzaRepository } from '../repositories/OrderPizzaRepository'
import PgBoss from 'pg-boss'
import type { PizzaOrder, MarkOrderReadyRequest, MarkOrderReadyResponse } from '@pizza/api-contract/index'
import { ProductionClient } from '../clients/ProductionClient'

export class OrderPizzaService {
  constructor(private readonly orderRepo: OrderPizzaRepository,
  private readonly productionClient: ProductionClient,
  private readonly boss: PgBoss,
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

    console.log('Creating stale job for order', newPizza.id);

    const job = await this.boss.send(
      'check-order-status',
      { id: newPizza.id },
      {
        startAfter: '3 minutes',
      },
    );
    
    console.log('Order Service: job: ', job)
    console.log('Job created');

    const isReady = await this.productionClient.MakePizza(newPizza)
    
    return isReady
  }

  async updateOrder(data: MarkOrderReadyRequest) {
    return await this.orderRepo.markAsReady(data)
  } 

  async markOldOrder (id: number) {
    return await this.orderRepo.markOld(id)
  }

  async getOrderById (id: number) {
    await this.orderRepo.getById(id)
  }
}