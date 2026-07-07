import { db } from "../db/schema";
import { pizzas } from "../db/schema/schemaPizza";
import { eq, and, ne } from 'drizzle-orm'
import type { DataBaseResponse, MarkOrderReadyRequest, PizzaOrder } from '@pizza/api-contract/index'

export class OrderPizzaRepository {

  async create(data: PizzaOrder ) {
      const result = await db
      .insert(pizzas)
      .values({
        type: data.type,
        amount: data.amount,
        status: 'in process',
        timeOrder: new Date()
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

  async markAsReady(data: MarkOrderReadyRequest): Promise<DataBaseResponse[]> {

    return await db
      .update(pizzas)
      .set({ status: 'in process' }) //ранее этот метод помечал заказы ready, нов таком случае у меня не  было не готовых заказов в БД для этого ДЗ. Поэтому я изменила метод и он оставляет заказ "in process" 
      .where(and(eq(pizzas.type, data.type), eq(pizzas.amount, data.amount), ne(pizzas.status, 'ready')))
      .returning()
  }

  async markOld(id: number) {
    return db
      .update(pizzas)
      .set({
        status: 'stale',
      })
      .where(eq(pizzas.id, id));
  }
}