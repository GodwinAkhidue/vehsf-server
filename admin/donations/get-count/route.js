import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const get_count = express();
get_count.use(express.json());

get_count.get(`/api/admin/donations/get-count`, async (_, res) => {
  const query = `
        SELECT COUNT(*)
        AS total_count
        FROM donations;
    `;

  const { error, result } = await Query_Psql_DB(query);

  if (error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  const total = result.rows[0].total_count;

  return res.status(200).json({ success: true, total });
});

export default get_count;
