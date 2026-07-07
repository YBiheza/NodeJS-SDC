import { pgTable, serial, integer, text, real, timestamp } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm'

export const pizzas = pgTable('pizzas', {
    id: serial('id').primaryKey(),

    type: text('type').notNull(),
    amount: integer('amount').notNull(),

    status: text('status').notNull(),

    timeOrder: timestamp('timeorder').notNull()
}) 

