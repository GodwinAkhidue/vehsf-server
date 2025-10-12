import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const add = express();
add.use(express.json());

add.post("/api/admin/explore-impact/add", async (req, res) => {
  const { image, title, content } = req.body;
  const id = uuidv4();

  const query = `INSERT INTO explore_impact
  (id, image, title, content) 
  VALUES ($1, $2, $3, $4);`;

  const values = [id, JSON.stringify(image), title, content];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    console.log(error)
    return res
      .status(200)
      .json({ success: false, error: "Failed to add article post" });
  }

  return res.status(200).json({ success: true });
});

export default add;
