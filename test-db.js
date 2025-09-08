import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  port: process.env.POSTGRESQL_PORT,
});

export async function TestDB() {
  await client
    .connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .then(async () => {
      const res = await client.query("SELECT NOW()");
      console.log("⏰ DB Time:", res.rows[0]);
      client.end();
      return `DB TIME: ${res.rows[0]}`;
    })
    .catch((err) => console.error("❌ Connection error", err.stack));
}
