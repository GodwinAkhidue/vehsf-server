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

client
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .then(() => client.query("SELECT NOW()"))
  .then((res) => {
    console.log("⏰ DB Time:", res.rows[0]);
    client.end();
  })
  .catch((err) => console.error("❌ Connection error", err.stack));
