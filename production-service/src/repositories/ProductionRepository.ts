import { db, pizzas,  production} from "../db/schema";
import { eq } from 'drizzle-orm'

export class ProductionRepository {
  async getIngredientByName(ingredient: string) {
    const result = await db
      .select()
      .from(production)
      .where(eq(production.ingredient, ingredient))

    return result[0]
  }
}