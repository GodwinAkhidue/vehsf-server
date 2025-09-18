import { Query_Psql_DB } from "../../../config/psql_config";

export default async function Skills() {
  const query = `CREATE TABLE IF NOT EXISTS skills (
        name VARCHAR UNIQUE
    );`;

  const response = await Query_Psql_DB(query);
  const { error } = response;

  if (error) {
    return false;
  }
  return true;
}
