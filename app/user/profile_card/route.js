import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Query_Psql_DB } from "../../../config/psql_config.js";

dotenv.config();

const profile_card = express();
profile_card.use(express.json());

profile_card.get(`/api/user/profile-card`, async (req, res) => {
  const token = req.cookies.authToken;
  const key = process.env.JWT_SECRET_KEY;

  if (!token) {
    console.log("No login detected");
    return res
      .status(200)
      .json({ success: false, message: "No login detected" });
  }

  try {
    const details = jwt.verify(token, key);
    const query = `
        SELECT firstname, lastname, profile_picture 
        FROM users
        WHERE id = $1`;
    const values = [details.id];
    const { error, result } = await Query_Psql_DB(query, values);
    if (result) {
      const profileCard = result.rows[0];
      return res.status(200).json({ success: true, profileCard });
    }
    console.log(error);
    return res.status(200).json({ success: false, message: "Error" });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, message: "Error" });
  }
});

export default profile_card;
