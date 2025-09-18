import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const port: any = process.env.POSTGRESQL_PORT;

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  port,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.log("Unexpected error on idle client", err);
});

export async function Query_Psql_DB(query: string, values?: any[]) {
  try {
    const db = await pool.connect();
    const result = await db.query(query, values);
    db.release();
    return { result };
  } catch (error) {
    return { error };
  }
}
