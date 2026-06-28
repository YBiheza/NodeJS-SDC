import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
export * from './schemaProduction'
export * from '../../../../order-service/src/db/schema'
export * from '../../../../shipment-service/src/db/schema'


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool)