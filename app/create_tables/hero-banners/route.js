import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function Hero_Banners() {
  const query = 
    `CREATE TABLE IF NOT EXISTS hero_banners (
        id VARCHAR UNIQUE,
        background_image JSONB,
        title VARCHAR,
        person_image JSONB,
        small_image JSONB,
        active BOOLEAN DEFAULT FALSE
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }
  return true;
}
