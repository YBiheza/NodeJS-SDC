import 'dotenv/config'
import PgBoss from 'pg-boss'

if (!process.env.DATABASE_URL) {
    throw new Error ('Shipment Boss: Database error')
}

export const pgboss = new PgBoss ({
    connectionString: process.env.DATABASE_URL,
    schedule: true
})