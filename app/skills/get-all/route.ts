import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config";

const get_all = express();
get_all.use(express.json());

get_all.get("/api/skills/get-all", async (_, res) => {
  const query = `
    SELECT name FROM skills
    ORDER BY name ASC;
  `;

  const response = await Query_Psql_DB(query);
  const { result, error } = response;

  if (error) {
    return res.status(200).json({
      success: false,
      message: "Could not fetch skills, please reload the page",
    });
  }
  

  return res.status(200).json({ success: true, skills: result?.rows });
});

export default get_all;
