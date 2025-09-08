import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  port: process.env.POSTGRESQL_PORT,
});

export async function TestDB() {
  const db = await pool.connect();

  const res = await db.query(`SELECT NOW();`);

  return `DB TEST: ${JSON.stringify(res.rows[0])}`;
}
