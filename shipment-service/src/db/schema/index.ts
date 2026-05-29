import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
//import pkg from 'pg'
import { Pool } from 'pg'
//import { orders } from './schemaOrder'
//import { shipments } from './schemaShipment'
export * from './schemaShipment'
export * from '../../../../order-service/src/db/schema'
export * from '../../../../production-service/src/db/schema'


/*const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool/*, { schema: { orders } }*/)