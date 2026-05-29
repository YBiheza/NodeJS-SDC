import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm'

export const shipments = pgTable ('shipments', {
    id: serial('id').primaryKey(),

    targetWarehouse: text('targetWarehouse').notNull(),

    ingredient_id: text('ingredient_id').notNull(),

    unit: integer('unit').notNull(),

    date: timestamp('date').notNull()

}) 