import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm'

export const production = pgTable('production', {
  id: serial('id').primaryKey(),

  ingredient: text('type').notNull(),
  amount: integer('amount').notNull(),
})