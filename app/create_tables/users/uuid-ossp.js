import { Query_Psql_DB } from "../../../config/psql_config.js";

export default async function uuid_ossp() {
  const query = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
  //Create uuid extension on postgresql database
  //This extension helps to auto-generate random uuid in postgresql

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }
  return true;
}
