import { db } from "../db/schema";
import { pizzas } from "../db/schema/schemaPizza";
import { eq, and } from 'drizzle-orm'
import type { PizzaOrder } from '@pizza/api-contract/index'

export class OrderPizzaRepository {

  async create(data: PizzaOrder ) {
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

  async getById(id: number) {
    const result = await db
      .select()
      .from(pizzas)
      .where(eq(pizzas.id, id))

    return result[0]
  }

  async getReady() {
    const result = await db
      .select()
      .from(pizzas)
      .where(eq(pizzas.status, 'ready'))

      return result
  }

  async markAsReady(data: PizzaOrder) {

    return await db
      .update(pizzas)
      .set({ status: 'ready' })
      .where(and(eq(pizzas.type, data.type), eq(pizzas.amount, data.amount)))
      .returning()
  }
}