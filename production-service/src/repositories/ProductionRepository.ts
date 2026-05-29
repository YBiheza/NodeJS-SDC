import { db, pizzas,  production} from "../db/schema";
import { eq } from 'drizzle-orm'
import { PizzaOrder } from "@pizza/api-contract";

export class ProductionRepository {

  /*async create(data: PizzaOrder ) {
      const result = await db
        .insert(pizzas)
        .values({
          type: data.type,
          amount: data.amount,
          status: 'in process'
        })
        .returning()

    return result[0]
  }
    
  async getAll() {
    return await db.select().from(pizzas)
  }
*/
  async getIngrByName(ingredient: string) {
    const result = await db
      .select()
      .from(production)
      .where(eq(production.ingredient, ingredient))

    return result[0]
  }
}