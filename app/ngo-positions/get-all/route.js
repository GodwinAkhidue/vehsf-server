import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const get_all = express();
get_all.use(express.json());

get_all.get("/api/ngo-positions/get-all", async (_, res) => {
  const query = `
    SELECT name FROM ngo_positions
    ORDER BY name ASC;
  `;

  const response = await Query_Psql_DB(query);
  const { result, error } = response;

  if (error) {
    return res.status(200).json({
      success: false,
      message: "Could not fetch positions, please reload the page",
    });
  }

  return res.status(200).json({ success: true, positions: result?.rows });
});

export default get_all;
