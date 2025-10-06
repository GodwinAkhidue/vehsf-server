import express from "express";
import { Query_Psql_DB } from "../../../../config/psql_config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const profile_picture = express();
profile_picture.use(express.json());

profile_picture.post(`/api/user/update/profile-picture`, async (req, res) => {
  const { profilepicture } = req.body;

  const token = req.cookies.authToken;
  const key = process.env.JWT_SECRET_KEY;

  function noLogin() {
    res.status(200).json({ success: false, message: "No login detected" });
  }

  if (!token) {
    return noLogin();
  }

  const details = jwt.verify(token, key);

  if (!details.id) {
    return noLogin();
  }

  const query = `
    UPDATE users
    SET profile_picture = $1
    WHERE id = $2;
    `;

  const values = [JSON.stringify(profilepicture), details.id];

  const { error } = await Query_Psql_DB(query, values);

  if (error) {
    return res.status(200).json({ success: false, message: "Database Error" });
  }

  return res.status(200).json({ success: true });
});

export default profile_picture;
