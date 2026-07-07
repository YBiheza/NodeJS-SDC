import { db } from "../db/schema";
import { shipments } from "../db/schema";
import { eq, lt } from 'drizzle-orm'
import { TWarehouse } from "../types/TWarehouse";
import { IIngredient } from "../interfaces/IIngredients";

export class ShipmentRepository {
    async createShipment (shipment: {
        targetWarehouse: TWarehouse,
        ingredients: IIngredient[],
        date: Date,
    }) {
        const results = []
        for (const ingred of shipment.ingredients) {
            const result = await db 
            .insert(shipments)
            .values({
                targetWarehouse: shipment.targetWarehouse,
                ingredient_id: ingred.id,
                unit: ingred.unit,
                date: shipment.date,
                })
            .returning()
            
            results.push(result[0])
        }
        return results
    }

    async getShipmentById(id: number) {
        const result = await db
        .select()
        .from(shipments)
        .where(eq(shipments.id, id))
        if(result[0] === undefined) {
            throw new Error('no order with such id')
        }
        return result[0]
    }

    async getAllShipments() {
        const res = await db
        .select()
        .from(shipments)
        if (res.length === 0) {
            throw new Error ('The DB is empty')
        }
        return res
    }

    async deleteById (id: number) {
        const res = await db 
        .delete(shipments)
        .where(eq(shipments.id, id))
        .returning()
        if (res[0] === undefined) {
            throw new Error('no order with such id')
        }
        return res[0]
    }

    async deleteExpired (): Promise<number> {
        const dateOfExpiration = new Date();

        dateOfExpiration.setDate(dateOfExpiration.getDate()-7)
        console.log('Delete everything before:', dateOfExpiration);

        const res = await db    
        .delete(shipments)
        .where(lt(shipments.date, dateOfExpiration))
        .returning({id: shipments.id})
        if (res.length === 0) {
            console.log('ShipmentsRepo: no expired order, congrats!')
        }
        console.log("Deleted:", res);
        return res.length
    }
}