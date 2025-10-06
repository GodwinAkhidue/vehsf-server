import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function Admins() {
  const query = `CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR UNIQUE,
        email VARCHAR UNIQUE,
        password VARCHAR,
        name VARCHAR
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }
  return true;
}
