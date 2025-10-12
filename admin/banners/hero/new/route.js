import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Query_Psql_DB } from "../../../../config/psql_config.js";

const newHero = express();
newHero.use(express.json());

newHero.post("/api/admin/banners/hero/new", async (req, res) => {
  const { bg, person, small, title } = req.body;

  const id = uuidv4();

  const query = `
        INSERT INTO hero_banners
        (id, background_image, title, person_image, small_image, active)
        VALUES ( $1, $2, $3, $4, $5, $6 );
    `;

  const values = [id, bg, title, person, small, true];

  const { error, result } = Query_Psql_DB(query, values);

  if (error) {
    return res
      .status(200)
      .json({ success: false, message: "Could not create new hero banner" });
  }

  const query2 = `
        UPDATE hero_banners
        SET active = false
        WHERE id != $1;
    `;

  const values2 = [id];

  const { error: error2, result: result2 } = Query_Psql_DB(query2, values2);

  if (error2) {
    return res
      .status(200)
      .json({ success: false, message: "Could not update hero banners" });
  }

  return res
    .status(200)
    .json({ success: true });
});

export default newHero;
