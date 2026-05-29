import type { PizzaOrder, AvailabilityRequest } from '@pizza/api-contract'
import type { TPizza } from '@pizza/api-contract/shared types/TPizza'
import { ProductionRepository } from '../repositories/ProductionRepository'
import type { IPizzaIngredients } from '../interfaces/IIngredients'

const recipes: Record<TPizza, IPizzaIngredients> = {
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
}

export class ProductionService {

  constructor (private productionRepository: ProductionRepository) {}

  async checkAvailability(data: AvailabilityRequest) {
    const recipe = recipes[data.type]

    for (const ingredient in recipe) {
      const key = ingredient as keyof IPizzaIngredients


      const needed = (recipe[key] ?? 0) * data.amount

      const stock = await this.productionRepository.getIngrByName(ingredient)

      if(!stock) {
        return false
      }

      if(stock.amount < needed) {
        return false
      }
    }

    return true
  }

  async produce(data: PizzaOrder) {
    //const check = this.checkAvailability(data)

    /*if (!check) {
      throw new Error ('Can not make pizza - no ingredients')
    } else {
      console.log('➡️ CALLING AVAILABILITY CHECK', data)*/
      await fetch('http://localhost:3001/orders/ready', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: data.type,
          amount: data.amount
        }),
      })
      console.log('⬅️ AVAILABILITY RAW RESPONSE')
    //}
  }
}