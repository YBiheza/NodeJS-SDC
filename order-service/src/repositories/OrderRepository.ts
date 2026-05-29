import { db } from "../db/schema";
import { orders } from "../db/schema/schemaOrder";
import { eq } from 'drizzle-orm'
import type { TStatus } from "../types/TStatus";
import type { TCountry } from "../types/TCountry";
import { TPizza } from "../../../production-service/src/types/TPizza";

export class OrderRepository {
    async create(order: {
        item: string[],
        totalPrice: number,
        country: TCountry,
        date: Date,
        discount: number,
        finalPrice: number,
        status: TStatus
    }) {
        const arr = []
        for (const i of order.item) {
            const result = await db
            .insert(orders)
            .values({
                item: i,
                totalPrice: order.totalPrice,
                country: order.country,
                date: order.date,
                discount: order.discount,
                finalPrice: order.finalPrice,
                status: order.status
            })
            .returning()
            arr.push(result[0])
        }
        return arr
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
        if (result.length === 0) {
            throw new Error ('The DB is empty')
        }
        return result
    }

    async deleteById(id: number) {
        const result = await db
        .delete(orders)
        .where(eq(orders.id, id))
        .returning()

    if (result[0] === undefined) {
        throw new Error('no order with such id')
    }
    return result[0]
    }

    async updateStatus(type: TPizza, amount: number) {

        return await db
            .update(orders)
            .set({ status: 'ready' })
            .where(eq(orders.id, id))
        }
}