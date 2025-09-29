import express from "express";
import { Query_Psql_DB } from "../config/psql_config";

const deleteTables = express();
deleteTables.use(express.json());

deleteTables.get(`/deletetables`, async (_, res) => {
  const query = `DROP TABLE donations`;
  const query2 = `DROP TABLE users`;
  const query3 = `DROP TABLE skills`;

  await Query_Psql_DB(query);
  await Query_Psql_DB(query2);
  await Query_Psql_DB(query3);
});

export default deleteTables;
