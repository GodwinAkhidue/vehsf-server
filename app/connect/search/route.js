import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const search = express();
search.use(express.json());

search.post(`/api/connect/search`, async (req, res) => {
  const { state, lga } = req.body;

  const query = `
            SELECT firstname, lastname, phone, profile_picture, role
            FROM users
            WHERE LOWER(location->>'state') = LOWER($1)
            AND LOWER(location->>'lga') = LOWER($2);`;

  const values = [state, lga];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  const users = result.rows;

  return res.status(200).json({ success: true, users });
});

export default search;
