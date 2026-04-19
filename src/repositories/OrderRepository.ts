import { db } from "../db";
import { orders } from "../db/schema";
import { eq } from 'drizzle-orm'

export class OrderRepository {
    async create(order: {
        item: string[],
        totalPrice: number,
        country: string,
        date: Date,
        discount: number,
        finalPrice: number,
    }) {
                {
            const result = await db
                .insert(orders)
                .values(order)
                .returning()

            return result[0] 
        }
    }

    async getOrderById(id: number) {
        const result = await db
        .select()
        .from(orders)
        .where(eq(orders.id, id))
        if(result[0] === undefined) {
            throw new Error('no order with such id')
        }
        return result[0]
    }

    async getAll() {
        const result = await db
        .select()
        .from(orders)
        if(result[0] === undefined) {
            throw new Error('no order with such id')
        }
        return result
    }

    async deleteById(id: number) {
        const result = await db
        .delete(orders)
        .where(eq(orders.id, id))
        .returning()

    if (result.length === 0) {
        throw new Error('Order not found')
    }

    return result[0]
    }
}