import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const get_some = express();
get_some.use(express.json());

get_some.get("/api/news-and-blogs/get-all", async (_, res) => {
  const query = `SELECT id, image, title, content, created_at 
    FROM news_and_blogs
    ORDER BY created_at;`;

  const { error, result } = await Query_Psql_DB(query);

  if (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to retrieve news and blogs" });
  }

  return res.status(200).json({ success: true, articles: result.rows });
});

export default get_some;
