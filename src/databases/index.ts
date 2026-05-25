import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import pkg from 'pg'
import { shipments } from './schema'

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool, {schema: {shipments} })