import { pgTable, serial, integer, text, real, timestamp } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm'

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),

  item: text('item').array().notNull(),

  totalPrice: real('totalPrice').notNull(),

  country: text('country').notNull(),

  date: timestamp('date').notNull(),

  discount: real('discount').notNull(),

  finalPrice: real('finalPrice').notNull()
})

export type Order = InferSelectModel<typeof orders>

