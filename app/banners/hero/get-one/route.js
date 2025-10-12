import express from "express";
import { Query_Psql_DB } from "../../../../config/psql_config.js";

const get_one = express();
get_one.use(express.json());

get_one.get("/api/banners/hero/get-one", async(_, res) => {
  const query = `
        SELECT * FROM hero_banners 
        WHERE active = $1 
        LIMIT 1;
    `;

  const values = [true];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    return res
      .status(200)
      .json({ success: false, message: "Could not retrieve hero banner" });
  }

  const banner = result.rows[0];

  if (!banner) {
    return res
      .status(200)
      .json({ success: false, message: "No active hero banner found" });
  }

  return res.status(200).json({ success: true, banner });
});

export default get_one;
