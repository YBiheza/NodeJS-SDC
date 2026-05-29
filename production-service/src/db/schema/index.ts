import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
//import pkg from 'pg'
import { Pool } from 'pg'
//import { orders } from './schemaOrder'
export * from './schemaProduction'
export * from '../../../../order-service/src/db/schema'
export * from '../../../../shipment-service/src/db/schema'

/*const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool/*, { schema: { orders } }*/)