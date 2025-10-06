import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const remove = express();
remove.use(express.json());

remove.delete("/api/admin/skills/delete/:name", async (req, res) => {
  const { name } = req.params;

  const query = `
    DELETE FROM skills 
    WHERE name = $1;
  `;

  const values = [name];

  const response = await Query_Psql_DB(query, values);
  const { error } = response;

  if (error) {
    return res.status(200).json({
      success: false,
      message: "Could not delete skill",
    });
  }

  return res.status(200).json({ success: true });
});

export default remove;
