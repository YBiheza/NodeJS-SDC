import type { AvailabilityRequest, DataBaseResponse, MarkOrderReadyRequest } from '@pizza/api-contract'
import type { TPizza } from '@pizza/api-contract/shared types/TPizza'
import { ProductionRepository } from '../repositories/ProductionRepository'
import type { IPizzaIngredients } from '../interfaces/IIngredients'
import { OrderingClient } from '../clients/OrderClient'

/*const recipes: Record<TPizza, IPizzaIngredients> = {
  Margarita: {
    cheese: 2,
    tomatoes: 5,
    dough: 1,
  },
  Four_seasons: {
    mushrooms: 2,
    ham: 1,
    cheese: 6,
    tomatoes: 4,
    dough: 1,
    peperoni: 1, 
    cheder: 2,
    mozzarella: 2
  },
  Vegetarian: {
    cheese: 2,
    dough: 1,
    pepper: 3,
    olives: 10,
    tomatoes: 6,
    mushrooms: 8,
    cheder: 4,
    mozzarella: 4
  },
  Meat_and_mushrooms: {
    ham: 2,
    chicken: 3,
    sausages: 8,
    peperoni: 2,
    dough: 1,
    tomatoes: 2,
    cheese: 4
  },
  Chicken_kari: {
    chicken: 6,
    dough: 1,
    tomatoes: 2,
    cheese: 4,
    kari: 2,
  }
}*/

export class ProductionService {
  constructor (private readonly productionRepository: ProductionRepository) {}

  async checkAvailability(data: AvailabilityRequest) {
    const recipe = await this.productionRepository.getRecipe(data.type)

    if (recipe.length === 0) {
      return false;
    } 

    for (const ingredient of recipe) {
      const needed = ingredient.required * data.amount
      console.log(`We have: ${ingredient.ingredient}, ${ingredient.stock} \n and we need amount ${needed}`)

      if (needed > ingredient.stock) {
        return false
      }
    }
    return true;
  }

  private readonly orderClient = new OrderingClient

  async produce(data: DataBaseResponse) {
    const readyRequest: MarkOrderReadyRequest = {
      type: data.type,
      amount: data.amount,
    }
    const res = await this.orderClient.MarkAsReady(readyRequest)
    return res
  }
}