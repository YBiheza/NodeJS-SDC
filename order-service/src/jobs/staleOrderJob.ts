import 'dotenv/config'
import PgBoss from 'pg-boss';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

export const boss = new PgBoss({
  connectionString: process.env.DATABASE_URL,
});