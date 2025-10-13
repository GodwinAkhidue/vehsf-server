import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const get_some = express();
get_some.use(express.json());

get_some.get(`/api/admin/donations/get-some/:page`, async (req, res) => {
  const { page } = req.params;

  const offset = (page - 1) * 10;
  const limit = 10;

  const query = `
        SELECT 
            id, 
            amount,
            firstname,
            lastname,
            email,
            status,
            created_at
        FROM donations
        OFFSET $1
        LIMIT $2;
    `;

  const values = [offset, limit];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  const donations = result.rows;

  return res.status(200).json({ success: true, donations });
});

export default get_some;
