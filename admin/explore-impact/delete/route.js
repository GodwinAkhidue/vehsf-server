import express from "express";
import { Query_Psql_DB } from "../../../config/psql_config.js";

const delete_post = express();
delete_post.use(express.json());

delete_post.delete("/api/admin/explore-impact/delete/:id", async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM explore_impact WHERE id = $1;`;

  const values = [id];

  const { error, result } = await Query_Psql_DB(query, values);

  if (error) {
    console.log(error);
    return res
      .status(200)
      .json({
        success: false,
        error: "Failed to delete article post",
      });
  }

  return res.status(200).json({ success: true });
});

export default delete_post;
